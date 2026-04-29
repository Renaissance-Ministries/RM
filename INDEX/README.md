# Topic Indexes

**Renaissance Ministries**

---

## What this folder is

This folder holds **auto-generated topic index files**. Each `.md` file in this folder aggregates references to essays across the corpus that share a topic tag. The indexes are generated from YAML frontmatter (see `templates/RM_frontmatter_convention.md`) and contain only links and one-line summaries — no original content.

Indexes serve human navigation: when looking for everything written on Mormonism (across CCC, CCR, CHR, CFE, and any other module that has touched it), `INDEX/mormonism.md` is the entry point. The folder structure is a topic-flat namespace; nesting topic categories (e.g., `INDEX/religion/mormonism.md`) is intentionally avoided because cross-cutting essays defy single-category placement at the index layer for the same reason they defy it at the folder layer.

The unifying logical view of the corpus belongs primarily to the Christos AI retrieval layer, which reads frontmatter as metadata at query time. The indexes in this folder are the *human-facing* version of that same view.

---

## How indexes are generated

A simple script (to be built when capacity permits) reads every markdown file in the repo, parses the YAML frontmatter, and rebuilds the indexes from the `topics:` field across all files.

Until that script exists, indexes are maintained manually as needed. A small handful of high-traffic indexes (mormonism, eschatology, economic_theory, the topics that recur across many essays) are worth maintaining by hand; long-tail topics that show up in only one or two essays do not need an index file at all — the essays themselves are findable by other means.

This folder starts mostly empty. It populates as the corpus accumulates and as topics emerge that genuinely benefit from cross-module aggregation.

---

## File naming

Topic index filenames are lowercase, underscore-joined, matching the `topics:` tag values used in frontmatter:

- `INDEX/mormonism.md`
- `INDEX/eschatology.md`
- `INDEX/economic_theory.md`
- `INDEX/free_market.md`
- `INDEX/joseph_smith.md`

When a topic has known synonyms (`mormonism` and `lds` and `latter_day_saints`), the canonical form is whichever was used first in the corpus, and the synonyms get reconciled to the canonical form during periodic cleanup runs. A `glossary/topics.md` file tracks the canonical forms once it exists.

---

## File format

Each index file follows a simple, machine-readable pattern:

```markdown
---
title: "Topic Index: Mormonism"
type: index
date: 2026-04-28
generated: true
---

# Topic Index: Mormonism

Essays across the Renaissance Ministries corpus tagged with `mormonism`.
Auto-generated from YAML frontmatter; do not edit by hand.

## Christos Christianity Catalog (CCC)

- [Snuffer's Restoration: A Critique (Part 1)](../CCC_christos_christianity_catalog/essays/mormonism/snuffer-restoration-critique-part-1.md) — the institutional drift from Reformation to Restoration narrative; ESTABLISHED.
- [Snuffer's Restoration: A Critique (Part 2)](../CCC_christos_christianity_catalog/essays/mormonism/snuffer-restoration-critique-part-2.md) — the priesthood-claim arguments and their evaluation; ESTABLISHED.

## Christos Conspiracy Review (CCR)

- [Institutional Christianity and the Conspiracy Frame](../CCR_christos_conspiracy_review/essays/institutional-christianity-conspiracy-frame.md) — Mormonism as a case study in how restoration narratives can function conspiratorially; PROVISIONAL.

## Christos Fellowship Essays (CFE)

- [On the Authority Question](../CFE_christos_fellowship_essays/essays/on-the-authority-question.md) — broader reflection touching Mormon priesthood claims; ESTABLISHED.
```

The grouping by module makes the index navigable. The status flags (ESTABLISHED, PROVISIONAL, etc.) are preserved from the source files' frontmatter so a reader knows the epistemic posture of each entry without opening it.

---

## Relationship to /INDEX/ and the AI

The Christos AI does not need this folder to function — RAG retrieval works directly against the corpus and reads frontmatter as metadata at query time. The indexes here are for human readers navigating the corpus directly through the GitHub interface or a local checkout.

When the AI is asked to "show me everything on Mormonism," it can either retrieve directly from the corpus (its native operation) or read this folder's `mormonism.md` (a faster but less semantically nuanced path). Both are valid; the second is faster for users who already know the topic name.

---

**Renaissance Ministries | Hyperphysics Institute**
*One heart to make Christ King.*
