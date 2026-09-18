# CPP Bibliography Consolidation

**Date:** August 26, 2026
**Author:** Isak Gutierrez (from meeting transcript)
**Participants:** Thomas Abshier, Isak Gutierrez
**Project:** CPP

---

Thomas noticed the bibliography had fragmented from one master file into six satellite files. Isak investigated: satellite files were created during different build sessions (GR companions, EW series, QM series, etc.).

**Resolution:** merged all 5 satellite files into the single master bibliography (cpp_references.bib) — now 316 total entries.

**Legacy C-numbering mapped to current series IDs:**
- C1–C4, C6 → SRC01–SRC05 (SR1 companion papers)
- C5 → GR1A, C7 → GR1B, C8–C13 → GR1C–GR1H (promoted to GR series)

Thomas's directive: one canonical name per paper, no duplicate aliases in the master bib.

A naming changelog file created to track all historical aliases. All .tex files updated to reference the single master bibliography. Full rewrite of cite commands across the entire paper corpus will be needed — Claude will handle bulk of it.
