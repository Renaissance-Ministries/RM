# Meeting Notes — Thomas & Isak

**Friday, August 21, 2026 · 7:02–10:29 a.m. (break 8:20–9:16)**

---

## Today's Agreed Priority

**Get DOIs reserved for every paper, then do the "big Zenodo wave."** Everything else discussed today is downstream of this. The sequence Thomas and Isak settled on:

1. Regenerate the manifest so it reflects the current paper set (114 → 122)
2. Reserve a DOI for every paper
3. Write each reserved DOI into the bibliography next to its filename
4. Regenerate all PDFs so each references the updated bibliography
5. **Then** publish everything at once — the "big wave"

---

## Decisions Made

| Area | Decision |
|---|---|
| **Paper repository** | OSF DepositQ is Thomas's master tracker and the source of truth. Thomas updates DepositQ; Isak converts to Zenodo deposits. Name stays "OSF DepositQ" for now — possible rename once the pipeline is stable. |
| **Collision handling** | Accept that Thomas may be editing while Isak's snapshot is running. Take a snapshot, do the work, re-check on return, apply the delta. Not worth building coordination around. |
| **C-series papers** | The 8 old C-papers (C5–C21 range) are **retired, not migrated** — archived and removed from the manifest. Superseded by GR1A–GR1H. |
| **Publish order** | Nothing goes live until every DOI is reserved and every PDF is regenerated. No trickle publishing. |
| **Presidential address** | It's an **art piece**, not a campaign — a demonstration of what a president could sound like. If '28 doesn't happen, the same material becomes addresses for the 49th president. Ongoing series, not a one-shot. |
| **Format** | 8–10 minutes, plain and serious, no humor. Clippable moments for social. Working name: **Presidential Daily Brief.** |
| **Homeschool funding model** | Content free; **students pay their own API costs** via capped per-user keys. Ministry accepts donations but does not subsidize inference. Thomas's hard requirement: the project cannot go broke on token spend. |
| **Curriculum base** | OpenStax (Creative Commons) as the substrate. Start with **one course** — physics — run alongside CPP. |
| **Marilyn's role** | She learns a course first (biology, since she likes it) using Claude + OpenStax, with her entire learning track recorded. Then she converts that course into K–12 gradients using her teaching knowledge. Paid work. |
| **Isak's role shift** | Build the framework and get it working, then hand off "bot-sitting" to Marilyn so Isak is freed up. |

---

## Action Items

### Isak — this week

- [ ] **Regenerate `osf_papers_manifest.json`** — currently stale at 114, needs to reach 122
  - Remove 8 retired C-papers
  - Add 11 new GR entries (GR1A–GR1H series)
  - Add newly spotted papers: **SPIN3, SM11, SM12**
  - Handle the spin renaming: C20 → Spin 1, C21 → Spin 2, plus new Spin 3
- [ ] **Confirm the actual paper count** — Thomas said 122 at 7:15 but 117 at 10:26, and wasn't sure whether the Kerr-surface paper got written. Reconcile against DepositQ before regenerating.
- [ ] **Reserve DOIs** for every paper in the regenerated manifest
- [ ] **Update the bibliography** — DOI listed next to each filename
- [ ] **Regenerate all PDFs** so each references the updated bibliography
- [ ] **Hold the wave** until all of the above is verified, then publish
- [ ] Email Thomas a status update (promised at end of call)

### Isak — next

- [ ] Investigate OpenStax bulk access: can the whole corpus be downloaded under CC, or must it be pulled piece by piece? Check file sizes — Thomas notes video/audio would be the space problem.
- [ ] Decide storage: new GitHub repo vs. dedicated local drive for the curriculum project
- [ ] Start loading the OpenStax physics course into the project knowledge base, alongside CPP
- [ ] Process Thomas's existing online writings into a knowledge base for the presidential material
- [ ] Draft a first speech
- [ ] Verify the API credit programs (see Open Questions) and start an application if one fits

### Isak — personal

- [ ] Talk with girlfriend's father and stepmother about the ~$300K debt situation. Framework from Thomas: compare debt interest rate against rental yield; if the properties are cash-flow negative, sell. Bring **numbers**, not arguments — "the numbers don't lie." Also factor $10–20K per-unit turnover cost, and that unrepaired properties sell at a discount equal to the repair cost anyway.

### Thomas

- [ ] Finish the remaining GR papers: **Kerr surface derivation**, then the **LIGO paper**
- [ ] Write the essay on the minimal "Adam and Eve pod" — what a self-sufficient civilization-seeding package requires
- [ ] Write up today's conversation as a stored idea document (as done previously)
- [ ] Keep DepositQ auto-updating on each new paper (believes this is now instituted — worth confirming)
- [ ] Talk to Marilyn about the learn-then-convert curriculum role
- [ ] Longer term: set up the studio — whiteboard with overhead + forward cameras is already in place

---

## The LIGO Prediction — Worth Flagging

The most concrete near-term result from the GR suite. Thomas's black hole model has **no event horizon — it has a hard surface**. That predicts a ringdown signature: roughly **2 milliseconds between impact and bounce-back**, visible in gravitational wave data.

Why it matters: the data has **already been collected**. Nobody has looked for this signature because nobody's model predicts it. It's a retrodiction rather than a clean prospective test — weaker than a never-before-run experiment — but it's checkable now, with no new instrument time.

This is the strongest candidate for external validation in the whole program. It probably deserves its own priority track once the DOI wave clears.

---

## New Idea Material (captured, not yet developed)

**The StarDrive.** A propulsion concept falling out of the GR work: generate an SSV-absolute gradient adjacent to a mass connected to the ship, so the ship is continuously pulled toward a gradient it carries with it. Bootstrapping via local spacetime manipulation. Two configurations discussed — a compact engine-plus-mass unit for steady one-direction acceleration, versus enclosing the whole ship in the field, which is what would permit the abrupt maneuvering attributed to UFOs without killing the occupants. Not FTL; relativistic time dilation does the work instead.

**The Adam and Eve pod.** The civilization-seeding package: a couple (or stored gametes), self-replicating robotics, terraforming units, mining robots, plus the complete cultural payload — Earth's history so it isn't repeated, and the theology so the framing survives the trip. Thomas is writing this up as an essay.

**Susan's theology of the devil.** A genuinely different fork from Thomas's own framework: Lucifer as the *firstborn*, Christ as the second-born; Lucifer as an equal-magnitude opposing power who built this world on a rejected premise — controlling people into goodness rather than letting them choose it. A "tyranny of goodness." Notable open problem: the framework doesn't obviously account for where actual evil originates. Thomas's own model is more polar. Biblical pattern she's drawing on: Cain/Abel, Ishmael/Isaac, Esau/Jacob, Manasseh/Ephraim — firstborn wild, second-born blessed — read as shadows of a Satan/Christ archetype.

**Heaven as self-constructed.** The "many mansions" reading: near-death experiences report nearly everyone arriving somewhere pleasant, which raises the question of *which* somewhere. Possibility discussed — you receive what you spent your life pursuing, which for some is a bubble universe fitted exactly to their desires, and which lacks the fullness of the real thing without being recognizable as a loss from inside. Both agreed this is a dangerous idea, and that "not a common worldview" is putting it mildly.

**Cartoon physics for children.** Thomas's pitch: cartoons imprint children whether or not they understand the content. Animate conscious points assembling into quarks → protons → nuclei → atoms. Strict accuracy isn't the goal; the goal is that a child grows up knowing gravity, light, heat, and magnetism are *understood things*, not mysteries.

**Science fiction series.** Dramatize the StarDrive material — the technology struggles, the outfitting problems, the selection and moral training of the couple who'll parent a world. Isak's video and Runway setup as the production path.

---

## The Learning System — Design Notes

Thomas's core critique: conventional schooling produces a false sense of progress. Cram, test, forget, repeat. Retention is never actually measured.

His proposed alternative:

- **Essay only.** No multiple choice, no true/false. Mastery has to be demonstrated in the student's own words.
- **Next-day recall as the default loop.** Write an exposition → receive the full correct version → rewrite it in your own words → next day, tell the story of what you learned. Failure at that step means going too fast, not understanding, or cheating — and all three mean the same remedy.
- **Lifetime spaced repetition.** A permanent per-student repository holding every essay and every response, analyzable at any time for retention on any topic.
- **Progressive integration.** Day 1 asks about part A, day 2 about part B, day 3 asks you to connect them.
- **Auto-calibrating difficulty.** The AI reads the level from the response rather than from a placement test — drops a level on failure, raises on instant mastery. The student is always pushing uphill, and the same system spans K–12 through professional without a seam.
- **Accepted tradeoff:** this is much slower than conventional coverage. That's the point.

Isak's addition: a Duolingo-style gate — you don't advance until you can produce it back correctly.

---

## Open Questions

1. **Is the paper count 117 or 122?** Unresolved on the call. Depends on whether the Kerr-surface paper was actually written. Check DepositQ.
2. **API credit programs — all unverified.** These were read off search results during the call and none were independently confirmed. Before building the funding model on them, verify: the Anthropic startup program (reported as up to $25K in credits, Airtable application), the open-source program (reported as 6 months of Max 20x for OSS maintainers), and the Anthology Fund. Also unconfirmed: whether a 508(c)(1)(A) ministry qualifies for a *startup* program, and whether credits can be sub-allocated to end users with per-user caps — that's a real terms-of-service question, not just a technical one.
3. **Can OpenStax be bulk-downloaded** under its CC license, or does it require piece-by-piece extraction?
4. **What does OpenStax already provide** in the way of assessments, homework, and certification? Determines what's left for the project to add.
5. **K–6 has no OpenStax equivalent** — would need to be built from scratch. Is that in scope?
6. **Per-user credit cap amount** — $5 was floated, $2 also mentioned. Needs a real estimate of tokens per lesson.

---

*Notes compiled from the full call transcript. Items marked unverified were stated during the call from live search results and have not been independently checked.*
