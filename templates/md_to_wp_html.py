#!/usr/bin/env python3
"""
Convert the May 3 fellowship essay markdown to clean WordPress-paste HTML.

Output rules:
  - No <html>, <head>, <body>, no DOCTYPE, no inline CSS, no class names.
  - Strip YAML frontmatter.
  - Strip the H1 title (WordPress provides its own title field).
  - ## ...  -> <h2>...</h2>
  - ### ... -> <h3>...</h3>
  - **bold**   -> <strong>bold</strong>
  - *italic*   -> <em>italic</em>
  - Numbered list "1. ..." paragraphs become <ol><li>...</li></ol>
  - Horizontal rules (---) become <hr>
  - Em dashes and curly quotes preserved as authored.
"""

import re
import sys
from pathlib import Path


def convert_inline(text: str) -> str:
    """Convert inline markdown (bold, italic) to HTML. Bold first, then italic."""
    # **bold** -> <strong>bold</strong>
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    # *italic* -> <em>italic</em>  (after bold so we don't eat ** as two *)
    text = re.sub(r"\*(.+?)\*", r"<em>\1</em>", text)
    return text


def strip_frontmatter(md: str) -> str:
    """Remove the leading --- ... --- YAML frontmatter block."""
    lines = md.split("\n")
    if not lines or lines[0].strip() != "---":
        return md
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            return "\n".join(lines[i + 1 :]).lstrip("\n")
    return md


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

    # H1: skip (WordPress provides its own title)
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

    # Numbered list (one block whose lines each start "N. ...")
    lines = stripped.split("\n")
    if all(NUMBERED_LIST_RE.match(line) for line in lines):
        items = []
        for line in lines:
            content = NUMBERED_LIST_RE.sub("", line, count=1).strip()
            items.append(f"  <li>{convert_inline(content)}</li>")
        return "<ol>\n" + "\n".join(items) + "\n</ol>"

    # Default: paragraph. Internal newlines collapse to spaces.
    paragraph = " ".join(line.strip() for line in lines)
    return f"<p>{convert_inline(paragraph)}</p>"


def merge_consecutive_ols(html: str) -> str:
    """Each numbered-list item is its own block in the source, so the renderer
    emits one <ol>...</ol> per item. Merge consecutive ones into a single list."""
    # Repeatedly collapse "</ol>\n\n<ol>\n" -> "\n" until none remain.
    pattern = re.compile(r"</ol>\n\n<ol>\n")
    while pattern.search(html):
        html = pattern.sub("\n", html)
    return html


def convert(md: str) -> str:
    md = strip_frontmatter(md)
    blocks = split_blocks(md)
    rendered = [r for r in (render_block(b) for b in blocks) if r]
    html = "\n\n".join(rendered) + "\n"
    html = merge_consecutive_ols(html)
    return html


if __name__ == "__main__":
    src = Path(sys.argv[1])
    dst = Path(sys.argv[2])
    html = convert(src.read_text(encoding="utf-8"))
    dst.write_text(html, encoding="utf-8")
    print(f"Wrote {len(html)} bytes to {dst}")
