#!/usr/bin/env python3
"""
Convert a fellowship essay markdown file to clean WordPress-paste HTML.

Output rules:
  - No <html>, <head>, <body>, no DOCTYPE, no inline CSS, no class names.
  - Strip YAML frontmatter from the rendered body — BUT parse it first to
    extract title, author, and date for the HTML header block.
  - Strip the in-body H1 title (we emit the frontmatter title at the top
    instead, so the title is not duplicated).
  - Emit a header block at the top of the HTML:
        <h1>{title}</h1>
        <p><strong>By:</strong> {author}</p>
        <p><strong>Date:</strong> {Month Day, Year}</p>
  - ## ...  -> <h2>...</h2>
  - ### ... -> <h3>...</h3>
  - **bold**   -> <strong>bold</strong>
  - *italic*   -> <em>italic</em>
  - Numbered list "1. ..." paragraphs become <ol><li>...</li></ol>
  - Horizontal rules (---) become <hr>
  - Em dashes and curly quotes preserved as authored.

Protocol note (260519):
  Earlier versions stripped the H1 entirely because WordPress provided its
  own title field. We now emit title + author + date at the top of every
  rendered essay so that the rendered HTML is self-contained when viewed
  outside WordPress (in patches, in pull-request previews, in archival
  copies, in plain-browser viewing of the essays/ folder). WordPress users
  who do not want a duplicate title in the body should leave the WordPress
  post-title field empty, since the HTML now carries its own title.
"""

import re
import sys
from datetime import datetime
from pathlib import Path


# ---------------------------------------------------------------------------
# Frontmatter parsing
# ---------------------------------------------------------------------------

def parse_frontmatter(md: str) -> tuple[dict, str]:
    """Parse YAML frontmatter from the head of the document.

    Returns (frontmatter_dict, body_markdown). If no frontmatter, returns
    ({}, full_text).

    A lightweight parser that handles the fields we actually need
    (title, author, date) without requiring PyYAML. Values may be quoted
    with double or single quotes; the parser strips the quotes.
    """
    lines = md.split("\n")
    if not lines or lines[0].strip() != "---":
        return {}, md

    fm: dict[str, str] = {}
    body_start = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            body_start = i + 1
            break
        # Only capture simple "key: value" lines at the top level.
        m = re.match(r"^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.*)$", lines[i])
        if m:
            key = m.group(1).strip()
            value = m.group(2).strip()
            # Strip surrounding quotes if present.
            if (
                len(value) >= 2
                and value[0] == value[-1]
                and value[0] in ("'", '"')
            ):
                value = value[1:-1]
            fm[key] = value

    if body_start is None:
        return fm, ""
    body = "\n".join(lines[body_start:]).lstrip("\n")
    return fm, body


def format_date(raw: str) -> str:
    """Convert 'YYYY-MM-DD' (or similar) into 'Month Day, Year'.

    If parsing fails, return the raw string unchanged.
    """
    raw = raw.strip()
    for fmt in ("%Y-%m-%d", "%Y/%m/%d", "%Y.%m.%d"):
        try:
            dt = datetime.strptime(raw, fmt)
            # %-d is non-portable on Windows; use a portable strip.
            day = str(dt.day)
            return f"{dt.strftime('%B')} {day}, {dt.year}"
        except ValueError:
            continue
    return raw


# ---------------------------------------------------------------------------
# Inline markdown
# ---------------------------------------------------------------------------

def convert_inline(text: str) -> str:
    """Convert inline markdown (bold, italic) to HTML. Bold first, then italic."""
    # **bold** -> <strong>bold</strong>
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    # *italic* -> <em>italic</em>  (after bold so we don't eat ** as two *)
    text = re.sub(r"\*(.+?)\*", r"<em>\1</em>", text)
    return text


# ---------------------------------------------------------------------------
# Block-level markdown
# ---------------------------------------------------------------------------

def split_blocks(md: str) -> list[str]:
    """Split markdown into blocks separated by blank lines."""
    blocks = []
    current: list[str] = []
    for line in md.split("\n"):
        if line.strip() == "":
            if current:
                blocks.append("\n".join(current))
                current = []
        else:
            current.append(line)
    if current:
        blocks.append("\n".join(current))
    return blocks


NUMBERED_LIST_RE = re.compile(r"^\d+\.\s+")


def render_block(block: str) -> str:
    """Render a single block. Returns HTML (no trailing newline)."""
    stripped = block.strip()

    # H1: skip in body (we emit the frontmatter title at the top of the HTML)
    if stripped.startswith("# ") and not stripped.startswith("## "):
        return ""

    # H2
    if stripped.startswith("## "):
        text = stripped[3:].strip()
        return f"<h2>{convert_inline(text)}</h2>"

    # H3
    if stripped.startswith("### "):
        text = stripped[4:].strip()
        return f"<h3>{convert_inline(text)}</h3>"

    # Horizontal rule
    if stripped == "---":
        return "<hr>"

    # Blockquote: any block whose every line begins with "> "
    lines = stripped.split("\n")
    if all(line.lstrip().startswith(">") for line in lines):
        cleaned = []
        for line in lines:
            s = line.lstrip()
            if s.startswith("> "):
                cleaned.append(s[2:])
            elif s.startswith(">"):
                cleaned.append(s[1:])
            else:
                cleaned.append(s)
        paragraph = " ".join(c.strip() for c in cleaned if c.strip())
        return f"<blockquote><p>{convert_inline(paragraph)}</p></blockquote>"

    # Numbered list (one block whose lines each start "N. ...")
    if all(NUMBERED_LIST_RE.match(line) for line in lines):
        items = []
        for line in lines:
            content = NUMBERED_LIST_RE.sub("", line, count=1).strip()
            items.append(f"  <li>{convert_inline(content)}</li>")
        return "<ol>\n" + "\n".join(items) + "\n</ol>"

    # Unordered list ("- ..." on every line)
    if all(line.lstrip().startswith("- ") for line in lines):
        items = []
        for line in lines:
            content = line.lstrip()[2:].strip()
            items.append(f"  <li>{convert_inline(content)}</li>")
        return "<ul>\n" + "\n".join(items) + "\n</ul>"

    # Default: paragraph. Internal newlines collapse to spaces.
    paragraph = " ".join(line.strip() for line in lines)
    return f"<p>{convert_inline(paragraph)}</p>"


def merge_consecutive_lists(html: str) -> str:
    """Each list item is its own block in the source, so the renderer emits
    one <ol>...</ol> (or <ul>...</ul>) per item. Merge consecutive ones into
    a single list."""
    for open_tag, close_tag in (("<ol>", "</ol>"), ("<ul>", "</ul>")):
        pattern = re.compile(rf"{close_tag}\n\n{open_tag}\n")
        while pattern.search(html):
            html = pattern.sub("\n", html)
    return html


# ---------------------------------------------------------------------------
# Top-level conversion
# ---------------------------------------------------------------------------

def render_header(fm: dict) -> str:
    """Render the title / author / date header block from frontmatter.

    Emits whichever of the three are present. If none are present, returns
    an empty string (so this function is safe to call on any document).
    """
    title = fm.get("title", "").strip()
    author = fm.get("author", "").strip()
    date_raw = fm.get("date", "").strip()
    date_human = format_date(date_raw) if date_raw else ""

    parts: list[str] = []
    if title:
        parts.append(f"<h1>{convert_inline(title)}</h1>")
    if author:
        parts.append(f"<p><strong>By:</strong> {convert_inline(author)}</p>")
    if date_human:
        parts.append(f"<p><strong>Date:</strong> {date_human}</p>")
    return "\n\n".join(parts)


def convert(md: str) -> str:
    fm, body_md = parse_frontmatter(md)
    header_html = render_header(fm)

    blocks = split_blocks(body_md)
    rendered = [r for r in (render_block(b) for b in blocks) if r]
    body_html = "\n\n".join(rendered)
    body_html = merge_consecutive_lists(body_html)

    parts = []
    if header_html:
        parts.append(header_html)
    if body_html:
        parts.append(body_html)
    return "\n\n".join(parts) + "\n"


if __name__ == "__main__":
    src = Path(sys.argv[1])
    dst = Path(sys.argv[2])
    html = convert(src.read_text(encoding="utf-8"))
    dst.write_text(html, encoding="utf-8")
    print(f"Wrote {len(html)} bytes to {dst}")
