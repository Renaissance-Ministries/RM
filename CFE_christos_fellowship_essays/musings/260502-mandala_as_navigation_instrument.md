---
title: "The Mandala as Navigation Instrument — A Working Articulation"
author: ["Thomas Lee Abshier, ND", "Claude (Anthropic) — clarifying interlocutor"]
date: 2026-05-02
module: CFE
secondary_modules: [CRF, CLO]
topics: [mandala, michael_sherman, life_mandala, navigation, you_are_here, oneness, cpp_oneness_postulate, contemplative_orientation, classification_systems, phenomenology_of_place]
status: PROVISIONAL
type: musing
related_documents:
  - "templates/RM_future_projects.md (FP1)"
  - "CFE_christos_fellowship_essays/essays/260406-the-life-mandala-incorporating-all-perspectives.md"
---

# The Mandala as Navigation Instrument — A Working Articulation

**A musing produced May 2, 2026, in dialogue between Thomas Lee Abshier and Claude. Preserves the philosophical articulation of what Michael Sherman's Life Mandala does for a reader, distinguishing it from the classification-system framing it had been given in earlier sessions.**

---

## §1. Thomas's articulation

*Original prose, lightly edited only for typographical cleanup. Substantive content unchanged.*

Regarding Michael Sherman's mandala of life: I see it as a navigation aide. A meta-marker that educates that all of life is part of a continuum. It is a "you are here" marker on the map of every piece of knowledge / method, or existence. It could be mapped onto a graphic generated for each paper as a way of classifying every entity and action as a way of teaching proper perspective about life.

Thus, this project is purely about mind-place orientation, giving the individual the perspective of location in abstract knowledge-experience space. It has a heart-mind benefit of giving people a sense of having a place to stand, a sense of stability, a sense of having traveled from one place to another — not better, not worse, not supremely meaningful in itself, but whose meaning is derived secondarily from the experience of being in that space.

The method: classification, sub-classification, and sub-sub-classification, of the "you are here" marker, to orient the mind-heart of the individual to appreciate the distinction between concept and experience spaces.

This is in service of educating around the idea that the entirety of all life is aspects of the oneness of God and all of His creation, which is the foundational axiomatic implication of the CPP postulate. Seeing the location, and the perspective of self and other, current location and other locations, from this perspective gives the solidity of always being "here" regardless of the adjacent scenery.

## §2. Claude's reframing and elaboration

*Substantive contributions by Claude, written in dialogue with Thomas and incorporated here at his explicit instruction. Preserved because the reframing added "finish, gravity, and applicability" to the original articulation (Thomas's own assessment) and serves as grist for future essays or the eventual mandala-implementation work itself.*

Three things follow from Thomas's articulation that change what the project actually is, compared to how it had been framed in the previous turn's draft of the future-projects entry.

### M1 (Claude): The mandala is a graphic, not metadata.

The previous framing treated the mandala as a parallel classification taxonomy — a `mandala_sector` field in YAML frontmatter, indexed alongside the existing module + topics tags. That framing misses what Thomas is describing. What goes onto each paper is a small visual artifact — a mandala figure with the current essay's location lit up — not a metadata field. The mandala lives at the level of *user-facing graphic asset*, possibly auto-generated from the essay's content or position, possibly hand-placed.

The execution architecture for that is different from what an indexer needs. It requires a canonical mandala definition with however many levels of sub- and sub-sub-classification settle into use; a small per-essay annotation specifying which location to highlight; a renderer that produces an SVG (or PNG) with the location lit up; and integration with the essay's display contexts (web rendering, PDF export, eventually the AI's response when discussing the essay).

### M2 (Claude): The purpose is heart-mind, not retrieval.

Thomas is explicit about this and the previous framing missed it. The mandala serves *solidity, stability, the sense of having traveled from one place to another, the appreciation of being "here" regardless of adjacent scenery*. This is contemplative tooling, not search infrastructure. It serves a reader's interior orientation in the moment of reading — not a system's ability to find the essay later.

The distinction is large because it changes what success looks like. A classification system succeeds when retrieval queries land on the right essays. A navigation instrument succeeds when readers feel oriented. Those are different evaluation criteria, requiring different design choices, and the success of one does not imply the success of the other.

This also clarifies what value the mandala adds *beyond* the existing classification systems in the corpus. The 29-module taxonomy answers "which product does this serve?" The free-form `topics` tags answer "what subjects does this touch?" The status field answers "how settled is this thinking?" None of those answers what the mandala answers: "where is this in the larger landscape of human meaning, and what is your relationship to that landscape?"

### M3 (Claude): It carries theological weight.

Thomas connects the mandala directly to the CPP postulate of oneness — *all of life as aspects of the oneness of God and all His creation*. The mandala is therefore not a neutral navigation aid; it is a teaching apparatus for a specific metaphysics. The "you are here" marker is in service of the deeper claim that there is one *here*, and the local scenery does not change the underlying ground. Different sectors of the mandala are not different *places* in any ultimately meaningful sense; they are different *aspects of one place*, viewed from different angles.

This is liturgy in graphic form. It is closer in genre to a stained-glass window, a chant, or a mandala-in-the-traditional-sense than to a card catalog. It teaches by repeated exposure rather than by lookup.

The implication for execution: the mandala graphic on each essay is not just a wayfinding device; it is also a contemplative artifact that the reader sees alongside the prose. Its visual design matters in a way that a YAML frontmatter field's design does not. Aesthetic choices about how the highlight is rendered, how the surrounding sectors are visible, what level of sub-sub-classification is shown, what color or weight is used for the current location versus the surroundings — these are theological choices, not interface choices.

## §3. What this implies for the future-projects entry

The FP1 entry in `templates/RM_future_projects.md` was drafted under the classification-system framing and is therefore partially wrong. It speaks of YAML frontmatter fields, `INDEX/mandala/` topic indexes, retrieval-time queries against mandala tags — all of which describe a project that Thomas is not actually proposing.

The corrected framing of FP1 is captured in the import script that lands this musing. The mandala project as Thomas describes it requires:

- A canonical mandala structure documented in usable form (probably from working sessions with Mike Sherman).
- A graphic renderer that produces per-essay mandala images with the current location lit up.
- An annotation convention (a simple frontmatter field is fine here — `mandala_location: 3.2.1` or similar — but its purpose is to feed the renderer, not to participate in retrieval).
- Integration with the essay's display layer — the website, the PDF export pipeline, eventually the AI's response when it discusses an essay.

The trigger conditions remain similar: reference to the actual mandala structure, and bandwidth to do design work that has aesthetic and theological dimensions, not just engineering ones.

## §4. Open questions raised by the articulation

Several questions surface that this musing does not resolve. They are listed here for future work, not as criticisms of the articulation:

**On the mandala's structure itself.** How many sectors? How many levels of sub-classification? Does the mandala's structure assert anything about the universe (i.e., is there a metaphysical claim embedded in *which* sectors exist, or is the partitioning pragmatic)? Mike Sherman's existing work presumably answers some of this; the answer matters for how flexibly the renderer should treat the structure.

**On per-essay placement.** Who decides where an essay lives in the mandala — Thomas, by hand? Claude, by analyzing the essay against the mandala definition? An algorithm using the essay's frontmatter? A hybrid where Claude proposes and Thomas confirms? Each has tradeoffs.

**On essays that span multiple sectors.** Many essays touch several aspects of life. Is the rendered graphic single-location ("you are here, primarily") or multi-location ("the regions of the mandala this essay engages")? The first is cleaner as a navigation device; the second is more accurate as a description.

**On the visual relationship between the mandala and other graphics in the essay.** Essays sometimes contain other diagrams, illustrations, or figures. Where does the mandala sit relative to those — header? footer? margin? page-corner watermark? Each placement carries different signals about what role the mandala plays for the reader.

These are not blockers; they are the design questions that will surface naturally once the project moves from intuition to implementation.

---

## §5. Authorship credit

**Thomas Lee Abshier, ND — substantive contributions:**

- The reframe of the mandala from classification system to navigation instrument. This is the core conceptual move that distinguishes what is now being proposed from what the previous draft of FP1 had described.
- The phenomenological articulation: solidity, stability, the sense of having traveled, the appreciation of being "here" regardless of adjacent scenery. This is original phenomenology that gives the project its evaluative criteria.
- The connection to the CPP oneness postulate, which transforms the project from neutral navigation infrastructure into a teaching apparatus for a specific metaphysics.
- The instruction to preserve this dialogue as a musing rather than letting it dissipate, and the explicit recognition that Claude's reframing should be credited and incorporated.

**Claude (Anthropic) — drafting and analytical contributions:**

- The three-point reframing (M1: graphic not metadata; M2: heart-mind not retrieval; M3: theological weight) as elaboration of Thomas's articulation.
- The implications for the FP1 entry's correctness, surfaced as part of the dialogue.
- The list of open questions in §4 as items the articulation does not yet resolve.
- The drafting of this musing in Thomas's voice and idiom under the frontmatter convention.

**Joint contributions:**

- The decision that the musings/ folder needed to exist as a distinct corpus slot, with this articulation as its first entry. The need was surfaced jointly through the conversation rather than originating with either author alone.

---

**End of musing.**

*This is a working articulation, not a finished essay. Its value is in being preserved at this stage of thinking, before refinement into argument and before any implementation work has begun. Future development may promote portions of this into a published essay (probably in CFE/essays/) or absorb the framework into the eventual mandala-rendering tooling. Until either of those happens, this remains here as a record of how the thinking started.*
