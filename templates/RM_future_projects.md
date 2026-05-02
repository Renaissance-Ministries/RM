---
title: "Renaissance Ministries — Future Projects"
author: "Thomas Lee Abshier, ND"
date: 2026-05-02
module: TEMPLATES
topics: [future_projects, deferred_enhancements, mandala, transcript_capture, roadmap]
status: PROVISIONAL
type: operating_system
version: "1.1"
revision_history:
  - "v1.0 (2026-05-02): Initial document. Captured two deferred items — mandala classification layer (FP1) and transcript-stream split (FP2)."
  - "v1.1 (2026-05-02): FP1 substantially reframed after Thomas clarified that the mandala is a navigation instrument (graphic, contemplative, theological) rather than a classification system (metadata, retrieval, indexing). The original framing in v1.0 was wrong about the project's genre and goals. The revised entry replaces the previous one wholesale; the original framing is preserved in the musing at CFE/musings/260502-mandala_as_navigation_instrument.md for the historical record."
---

# Renaissance Ministries — Future Projects

**Living document. Add freely. These are deferred until evidence or bandwidth makes them ripe.**

## Purpose

This file complements `templates/RM_organizational_open_questions.md` but plays a different role. The open-questions document captures organizational and procedural questions that need resolution to settle current practice. This document captures **forward-looking architectural extensions** — ideas worth pursuing eventually but explicitly deferred because they need either evidence from prototypes, more corpus accumulation, more bandwidth, or some combination.

Items belong here when:
- The idea has merit but is not blocking current work
- The right moment to act is later, not now
- Premature implementation would produce maintenance cost without proportionate value
- The idea would benefit from accumulated evidence (corpus growth, prototype results, real retrieval queries) before being designed

Items *don't* belong here when they are urgent enough to need resolution now (those go in the open-questions document) or substantive content questions (those go in their module folders). Items that are working philosophical articulations rather than projects awaiting execution belong in `CFE_christos_fellowship_essays/musings/` per the convention there.

## How to use this file

When an architectural or framework-level idea surfaces that isn't urgent and would benefit from later treatment, capture it here in the format below. Each entry includes the date it was raised, the originating context, the proposed work, and the trigger conditions that would move it from "deferred" to "ready to execute."

When an item *is* ready to execute, move it from this file to a fresh import script (or a new dedicated template document if it grew large enough to warrant one), with a revision-history entry recording the move.

---

## FP1: Render a Life Mandala navigation graphic for each essay

**Raised:** 2026-05-02 (Thomas, after taxonomy v1.2 landed; reframed in the same session after the original draft mischaracterized the project)

**Originating context:** Thomas observed that Michael Sherman's Life Mandala framework (NowAll.us, "Meaning in Life") could serve as a navigation instrument for the RM corpus — a "you are here" marker rendered graphically alongside each essay, orienting the reader in an abstract knowledge-experience space. The project is *not* a classification system or metadata layer; it is a contemplative graphic apparatus connected directly to the CPP oneness postulate. The original draft of this entry treated the mandala as a parallel index taxonomy with frontmatter tags and topic indexes, which mischaracterized both the genre (graphic, not metadata) and the purpose (contemplative orientation, not retrieval). The corrected understanding is preserved as a musing at `CFE_christos_fellowship_essays/musings/260502-mandala_as_navigation_instrument.md`, which should be read as the source articulation for any future execution work.

**Proposed work:**

1. Document the canonical mandala structure (sectors, sub-sectors, sub-sub-sectors) in a `templates/mandala_structure.md` file. This requires direct reference to Mike Sherman's existing work and probably one or more working sessions with him. The mandala's structure may carry metaphysical claims (about which sectors of life exist) that need to be understood before the rendering tooling is built.

2. Build a small renderer (probably SVG-generating Python or a static-site-generator extension) that takes a mandala-location annotation and produces a graphic with the specified location lit up against the surrounding sectors. The renderer should support however many levels of sub-classification the canonical structure has.

3. Adopt a simple per-essay annotation in YAML frontmatter — e.g., `mandala_location: "3.2.1"` — whose sole purpose is to feed the renderer. This is *not* an indexing field and is not used for retrieval. It is a positional pointer for graphic generation.

4. Integrate the rendered graphic into the essay's display contexts: the website, PDF exports, and (eventually) the AI's response when it surfaces an essay. The integration should treat the mandala graphic as a contemplative artifact whose visual design carries theological weight, not merely as a wayfinding chrome element.

5. Develop conventions for essays that span multiple sectors (single-location vs. multi-location rendering), for who decides placement (Thomas alone, Claude proposes / Thomas confirms, hybrid algorithm), and for visual placement on the page (header, footer, margin, watermark).

**Why deferred:**
- Requires direct access to the canonical mandala structure in usable form, which does not yet exist as a documented artifact.
- Has substantial design work that is aesthetic and theological, not just engineering — the visual choices carry meaning and cannot be made hastily.
- Would benefit from being undertaken when there is bandwidth for contemplative work, not as a sprint between other commitments.

**Trigger conditions:**
- A working session with Mike Sherman has produced (or recovered) a documented version of the mandala structure usable as a renderer specification.
- A `templates/mandala_structure.md` exists with sectors, sub-sectors, and sub-sub-sectors named and described.
- The Phase 2 RAG prototype has been built or is in progress, so the mandala work happens in a context where the corpus's basic discoverability is already established and the mandala is genuinely additive rather than substituting for missing infrastructure.

**Estimated effort once triggered:**

- Canonical structure documentation: 1-2 working sessions with Mike Sherman + 1 session for Thomas to write up.
- Renderer implementation: small (a focused engineering session or two).
- Integration with display contexts: depends on which contexts; the website integration is medium-effort, PDF export is small, AI integration is deferred until after the Phase 2 prototype is running.
- Per-essay placement annotation: small per essay; significant in aggregate, but distributed organically as essays are touched for other reasons rather than as a bulk pass.

---

## FP2: Consider splitting the paired meta-document into two streams (theoretical reasoning + organizational data)

**Raised:** 2026-05-02 (Thomas, after observing that CPP captured these as separate streams)

**Originating context:** Thomas asked whether the paired-meta-document convention adopted on 2026-04-30 (see `RM_organizational_open_questions.md` §C1) implements the same two-stream transcript capture pattern from CPP. Investigation found that RM's current convention combines what CPP keeps separate: **theoretical reasoning** (the debate about ideas, the proofs, the Claude-Claude and Claude-Thomas dialogue) and **organizational data** (procedural decisions, naming conventions, voice calibrations, framework refinements). RM's `.meta.md` files combine both into a single paired document; organizational decisions also leak into `RM_organizational_open_questions.md`.

**Proposed work (when triggered):**

1. After 5 or more paired meta-documents have been produced under the current single-stream convention, audit them.
2. If the meta-documents have grown unwieldy by carrying both theoretical reasoning *and* organizational decisions, split them:
   - `YYMMDD-essay_topic.meta.md` continues as the theoretical-reasoning record (Thomas's substantive moves, Claude's analysis, the back-and-forth shaping the essay's argument)
   - `YYMMDD-essay_topic.org.md` captures organizational/procedural decisions (naming conventions, voice rules adopted, structural innovations) for that session
   - `RM_organizational_open_questions.md` continues to aggregate cross-session organizational decisions, drawing from the per-session `.org.md` files
3. If the single-stream meta-documents have stayed focused on theoretical reasoning and organizational decisions are routing cleanly to `RM_organizational_open_questions.md`, the single-stream convention is fine and the CPP two-stream pattern was an artifact of CPP's specific context (long development arcs, paper-scale work) that doesn't apply to RM's session-scale essay work.

**Why deferred:**
- One paired meta-document exists so far (`260430-eight_strongholds_swirsky_redirect.meta.md`). The convention itself is days old.
- Designing the split before exercising the current convention is premature; evidence from practice should drive the architecture, not the other way around.

**Trigger conditions:**
- 5+ paired meta-documents have been produced.
- A focused session can audit them and observe whether organizational and theoretical material are mixing in problematic ways.

**Estimated effort once triggered:** Convention update + import script for any retrofit is small. The audit is the work. If the split is adopted, no retrofit of existing meta-documents is necessary — the convention applies to new work and existing files remain in their original form (the `.meta.md` files are themselves a deliberation record and shouldn't be retrospectively edited).

---

## Format for new entries

When adding a new future-project item, follow this template:

```markdown
## FPN: Short title

**Raised:** YYYY-MM-DD (originator)

**Originating context:** What surfaced this idea — what session, what work, what observation made it visible.

**Proposed work:** What the project would actually do, in concrete enough terms that someone could execute it.

**Why deferred:** Honest reasons it is not being done now.

**Trigger conditions:** What would have to be true for this to be ready to execute. Be specific.

**Estimated effort once triggered:** Rough scale of the work, broken into design vs. execution if relevant.
```

Number entries `FP1`, `FP2`, `FP3`, ... in chronological order of capture. Do not renumber when items are completed; mark them complete with a `**Status: Completed YYYY-MM-DD.**` line and leave the entry in place as a record. Only remove an entry when the proposed work is moved into a different live document (e.g. when FP1 graduates into `templates/mandala_structure.md` plus a renderer implementation, the FP1 entry here gets a redirect note pointing to the new locations).

---

**Renaissance Ministries | Hyperphysics Institute**
*One heart to make Christ King.*
