# Renaissance Ministries — YAML Frontmatter Convention

**Renaissance Ministries | Version 1.0 | April 28, 2026**

---

## Purpose

This document defines the canonical YAML frontmatter that prefaces every markdown content file in the Renaissance Ministries corpus. Frontmatter is the structured metadata block at the top of a `.md` file that declares what the file is, what module it belongs to, what topics it touches, what its status is, and when it was created.

The frontmatter is what makes the corpus *machine-navigable* — by the auto-generated topic indexes in `/INDEX/`, by the Christos AI retrieval layer, by any future build pipeline (newsletter assembly, book compilation, website generation). Without consistent frontmatter, every consuming system has to parse the prose to figure out what the file is about; with consistent frontmatter, every consuming system reads a few lines of structured data and knows.

Pair this document with `templates/RM_module_taxonomy.md` (the canonical module list) and `templates/authors_voice.md` (the voice spec).

---

## What frontmatter looks like

A YAML frontmatter block sits at the very top of the file, opened and closed by three hyphens on their own lines:

```yaml
---
title: "Snuffer's Restoration: A Critique"
author: "Thomas Lee Abshier, ND"
date: 2026-04-15
module: CCC
secondary_modules: [CCR, CHR]
topics: [mormonism, restoration, ecclesiology, snuffer]
status: ESTABLISHED
type: essay
---
```

After the closing `---` the regular markdown content begins. Most markdown renderers (GitHub, Pandoc, Jekyll, every static-site generator) understand frontmatter natively and either render it as a metadata table or hide it. Tools that do not understand it simply display it as text, which is harmless but ugly; in practice this is never an issue because every tool used in the RM workflow handles frontmatter natively.

---

## Required fields

Every content file declares these fields. Missing any of them is a defect that should be corrected when next touched.

### `title`

The full, human-readable title of the file. Quoted (YAML strings with colons or special characters need quoting; quoting always is simpler than remembering when).

```yaml
title: "Snuffer's Restoration: A Critique"
```

### `author`

The primary author. For Thomas's own work:

```yaml
author: "Thomas Lee Abshier, ND"
```

Co-authored work uses a YAML list:

```yaml
author: ["Thomas Lee Abshier, ND", "Isak Abshier"]
```

AI-collaborative work where Claude or another AI helped draft is still authored by Thomas (per `COPYRIGHT.md` §3.2); the AI collaboration may be acknowledged in the prose but does not appear in the `author` field.

### `date`

The date of the file's creation in ISO format (YYYY-MM-DD). Not the date of last edit; that is recorded in git history. The `date` field is the date the work *began* and is stable across revisions.

```yaml
date: 2026-04-15
```

### `module`

The 3-letter identifier of the primary module home of this file. Must be a valid identifier from `templates/RM_module_taxonomy.md`.

```yaml
module: CCC
```

Every file has exactly one primary module. If a file genuinely spans modules with no clear primary, its module is `CFE` (Christos Fellowship Essays), the default home.

### `status`

The Wisdom Database status level for the content of this file:

- `ESTABLISHED` — Thomas's settled position; engaged for, defended, taught.
- `PROVISIONAL` — Working position; held with reasonable confidence but open to revision.
- `UNDER DISCUSSION` — Actively being worked through; conclusions uncertain.
- `OPEN QUESTION` — Question identified, no position taken yet.

```yaml
status: ESTABLISHED
```

The Christos AI surfaces this status when retrieving content, per the recommendation in `templates/christos_ai_charter_questions.md` §4.3. Misdeclaring status — for example, marking a working hypothesis as ESTABLISHED — degrades the AI's epistemic integrity. When in doubt, declare PROVISIONAL.

---

## Optional but recommended fields

These fields enrich the metadata when applicable. Their absence is not a defect; their presence makes the file easier to find and to use.

### `secondary_modules`

A YAML list of additional 3-letter module identifiers this file touches. Used by `/INDEX/` regeneration to surface the file under multiple modules. Order does not matter.

```yaml
secondary_modules: [CCR, CHR, CFE]
```

A Snuffer critique essay primarily belongs to CCC (Christianity Catalog) under `mormonism/`, but also serves CCR (Conspiracy Review) where it engages claims about institutional Christianity, and CHR (Historical Review) where it engages the historical claims of the Restoration narrative. All three secondary modules tag.

If there are no secondary modules, omit the field rather than write `secondary_modules: []`.

### `topics`

A YAML list of free-form topic tags (lowercase, underscore-joined, no spaces). Used by `/INDEX/` regeneration to build per-topic aggregate pages.

```yaml
topics: [mormonism, restoration, ecclesiology, snuffer, joseph_smith]
```

Topics are not constrained to a fixed vocabulary; they accumulate organically. The risk of drift is real (one essay tags `mormonism`, another tags `lds`, a third tags `latter_day_saints`) and is mitigated by periodic reconciliation runs that consolidate near-duplicate tags. The repo will, over time, develop a `glossary/topics.md` that lists canonical tags and known synonyms; until then, prefer the most specific term and reuse what previous essays have used.

A reasonable essay has 3–8 topic tags. Fewer than 3 means the topics field is too coarse to be useful for indexing; more than 8 means the file is probably trying to be too many things at once.

### `type`

The kind of content this file is:

- `essay` — long-form prose argument (the default; most files)
- `operating_system` — module OS document
- `readme` — module README
- `transcript` — raw conversation transcript (typically in `journal/transcript/`)
- `summary` — synthesized session summary (typically in `journal/summary/`)
- `template` — reusable template document
- `index` — auto-generated topic index (in `/INDEX/`)
- `reference` — quotation file (in `/references/`)
- `glossary` — glossary entry (in `/glossary/`)
- `correspondence` — letters, exchanges (in module `correspondence/` folders)
- `book_chapter` — anthology chapter destined for the book pipeline (in module `book/` folders)
- `newsletter` — newsletter article (in module `newsletter/` folders)

If a file's type is ambiguous, default to `essay`.

```yaml
type: essay
```

### `version`

For files that go through formal revision (operating-system documents, the Theological Grammar, this convention itself), a semantic version string:

```yaml
version: "1.0"
```

Most essays do not need this field; their evolution is preserved by git history rather than by explicit versioning.

### `audience`

For modules with mixed audiences (CMD addresses both clinicians and laypeople; CRF addresses both philosophers and pastors), the intended audience:

- `lay` — accessible to general readers
- `intermediate` — assumes some familiarity
- `expert` — assumes domain expertise

```yaml
audience: lay
```

### `series`

For files that are part of a numbered series (Napoleon Part 1, Part 2, Part 3; the four-part demonology series), the series name and position:

```yaml
series: "Napoleon Bonaparte"
series_position: 4
series_total: 8
```

### `source_url`

For files that originated as posts on renaissance-ministries.com or another external location, the URL of the original. This is migration metadata; once a file is committed to the repo, the repo is canonical.

```yaml
source_url: "https://www.renaissance-ministries.com/snuffer-restoration-critique"
```

---

## A complete example

A fellowship essay that began life as a website post, engages Mormonism as its primary subject, touches conspiracy-review and historical-review concerns, is part of a numbered series, and represents Thomas's settled view:

```yaml
---
title: "Snuffer's Restoration: A Critique (Part 2)"
author: "Thomas Lee Abshier, ND"
date: 2026-04-15
module: CCC
secondary_modules: [CCR, CHR]
topics: [mormonism, restoration, ecclesiology, snuffer, joseph_smith, priesthood]
status: ESTABLISHED
type: essay
audience: intermediate
series: "Snuffer Restoration Critique"
series_position: 2
series_total: 4
source_url: "https://www.renaissance-ministries.com/snuffer-restoration-critique-part-2"
---

# Snuffer's Restoration: A Critique (Part 2)

The Protestant Fathers could protest...
```

A minimal essay (everything required, nothing optional):

```yaml
---
title: "On the Limits of Reform"
author: "Thomas Lee Abshier, ND"
date: 2026-04-28
module: CFE
status: PROVISIONAL
---

# On the Limits of Reform

A short reflection on...
```

---

## Validation and tooling

A simple validator script (Isak's territory, when capacity permits) can be added to the repo that:

1. Reads every `.md` file in the repo (excluding archive and node_modules).
2. Parses the frontmatter.
3. Reports any file with missing required fields, invalid `module` identifiers, or invalid `status` values.
4. Optionally rebuilds `/INDEX/` from the parsed metadata.

The validator does not need to exist on day one. The convention can be honored manually, and the validator added when the time investment pays back. Until then, periodic spot-checks against this document suffice.

---

## Backfill policy

Existing essays without frontmatter still function. They are added incrementally, not in a one-time sweep. The standing rule:

- **New essays:** must have full required-field frontmatter from creation.
- **Existing essays:** acquire frontmatter when next touched for any reason — revision, reference, consolidation, or migration to a module folder. The touch itself is the trigger.
- **Bulk backfill:** discouraged. The pattern of small, contextual additions produces better metadata than a rushed mass pass, because the person adding the frontmatter is already engaged with the content.

Within six months of normal writing activity, the bulk of the corpus has frontmatter. Files that never get touched probably do not need frontmatter; they are inert.

---

## Relationship to other conventions

- **Module taxonomy** (`templates/RM_module_taxonomy.md`) defines the valid `module` values.
- **Wisdom Database OS** (`templates/RM_wisdom_database_operating_system.md`) defines the valid `status` values.
- **Authors voice** (`templates/authors_voice.md`) governs the prose that comes *after* the frontmatter.
- **Copyright discipline** (`templates/copyright_discipline.md`) governs how the prose engages other creators' work.
- **License** (`/COPYRIGHT.md` and `/LICENSE`) governs how others may engage the prose.

---

## Revision history

- **v1.0 (April 28, 2026)** — Initial convention. Required fields: title, author, date, module, status. Optional fields: secondary_modules, topics, type, version, audience, series, source_url.

---

**Renaissance Ministries | Hyperphysics Institute**
*One heart to make Christ King.*
