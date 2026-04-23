# Founders Vision

**Renaissance Ministries | Established April 19, 2026**

*"Write the vision, and make it plain upon tables, that he may run that readeth it. For the vision is yet for an appointed time, but at the end it shall speak, and not lie: though it tarry, wait for it; because it will surely come, it will not tarry."* — Habakkuk 2:2–3

---

## What this folder is

This folder preserves the founding vision of Renaissance Ministries in three complementary forms. Each serves a different purpose. Together they provide the source material that feeds every public-facing artifact produced by the ministry — newsletters, position papers, Voting Network analyses, Christos AI training corpus, Wisdom Database entries.

| Sub-item                          | What it is                                                      | How it grows                                                        |
|-----------------------------------|-----------------------------------------------------------------|---------------------------------------------------------------------|
| `founders_vision.md`              | **Curated summary.** Integrated narrative of Thomas's theological intuitions, organized thematically. | Revised in place as the founder's understanding matures. Versioned internally. |
| `YYMMDD_topic_slug.md` (dated seeds) | **Raw archive.** Immutable, chronological record of what was said on a given day, by a named contributor. | New entries added over time; existing entries are never revised.    |
| `founders_quotes/`                | **Topical collections.** Quotes from Thomas and other named contributors, organized by subject rather than date. | Grows as new seeds accumulate enough mass on a given topic to warrant a dedicated file. Scope currently being defined — see `founders_quotes/README.md`. |

None of these replaces any of the others. The curated summary provides synthesis; the dated archive preserves the raw record; the topical quotes provide retrieval by subject. A reader who wants the integrated view reads `founders_vision.md`. A reader who wants to see how a particular idea emerged reads the dated seeds. A reader looking for Thomas's thinking on a specific subject reads the topical quotes.

---

## Relationship to the Wisdom Database

The Founders Vision folder is **not** the Wisdom Database. It feeds it.

| Founders Vision (this folder) | Wisdom Database (`templates/RM_wisdom_database_operating_system.md`) |
|---|---|
| Preserves raw and curated founder statements | Preserves refined, ministry-authoritative positions |
| Dated archive is immutable; summary is revised in place | Positions are versioned and can be refined or reversed |
| Private voice allowed in the summary and archive | Public voice only; ministry-authoritative |
| Raw material and curated synthesis | Finished reference |

The workflow is: **seed captured → archived with date → synthesized into `founders_vision.md` → referenced and refined in the Wisdom Database → deployed into public content** (newsletters, CVN analyses, Christos AI training corpus). Nothing in this folder is authoritative as a ministry position on its own. When a seed has been refined into a position, that position lives in the Wisdom Database, and the Wisdom Database entry cites the seed archive entries it grew from.

---

## 1. `founders_vision.md` — the curated summary

Thomas's integrated theological intuitions, organized by theme rather than by date. This is the WHY behind Renaissance Ministries: the central vision (God is everything), the diagnosis (hollowed-out Christianity, parasitic ideas, coordinated influence), the solution (transformation not coercion, testimony not silence, the absolute standard, Christ alone), and the method (fellowship, Christos AI, the long game).

**Purpose for readers:** a new collaborator (human or AI) reading this single file should understand not just what Thomas believes but why — enabling faithful extension of the vision to situations not explicitly addressed.

**Update rule:** revised in place when Thomas articulates a new foundational intuition or refines an existing one. The file carries internal version and date metadata. Previous versions may be preserved in `archive/` if the revision is substantial.

---

## 2. Dated seed archive — raw record

Filenames: `YYMMDD_topic_slug.md` at this folder's root, e.g. `260419_seed_archive_establishment.md`.

Entries are **immutable**. They preserve the founder's (and other named contributors') actual words on a given date, minimally edited for readability. If the contributor's thinking on a topic evolves, the new thinking is filed as a **new entry on the date it occurs** — not a revision of the old one. This gives future readers a true chronological record of how the vision developed.

**Filename convention:** `YYMMDD` (six digits), then a short lowercase underscore-separated topic slug. No version suffixes. Multiple entries on the same day distinguish with a trailing suffix only if topics are genuinely distinct.

**Entry structure:** title (H1), metadata block (date, contributor, source, one-line topic summary), the seed itself (the contributor's words, minimally edited), optional editor's note (clearly flagged as editorial, never mixed with the seed), optional elaboration hooks (open questions or follow-ups).

**Voice and attribution:**
- Thomas's words are preserved as his words. Grammar and typos may be lightly corrected. Substantive edits are not made.
- AI contributions (Claude, others) are clearly flagged — either as editor's notes or in separate elaboration files that cite this seed.
- Other named contributors (Margo, Isak, Michael Sherman, Susan, Charlie, Leonard, Armond, Todd, and others) get their names in the metadata block.
- No anonymous entries. Every seed has a named human or named AI author.

---

## 3. `founders_quotes/` — topical collections

Curated topical collections of Thomas's writing and spoken words. Organized by subject rather than date. The scope and conventions are still being defined — see `founders_quotes/README.md` for the current state.

---

## Hosting and publication

This folder will be published at [www.renaissance-ministries.com](https://www.renaissance-ministries.com) (or a dedicated subdomain) by Isak. All contributions are intended to be public. Write with the awareness that words committed here are a permanent, searchable, public record. Material that should not be public does not belong here.

---

## Maintenance

- New seed entries are added as the founder speaks them. No target cadence.
- `founders_vision.md` is revised in place, with internal version metadata.
- `founders_quotes/` fills in as topical mass accumulates.
- An `INDEX.md` may be added to this folder once entry count exceeds ~30; until then, directory listing and search are sufficient.

Claude and other AI tools may be asked to: format a transcribed seed into entry structure, produce elaboration files in sub-project folders that cite one or more seeds, merge seeds into updates of the summary document, or extract topical quotes into the `founders_quotes/` folder. All such work is audited by a named human contributor before being committed.

---

*End of Founders Vision folder README.*
