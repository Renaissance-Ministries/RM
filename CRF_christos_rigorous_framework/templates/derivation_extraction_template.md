# CRF Derivation Extraction Template

**Status:** v0.1 working template. Format will be revised after the first three derivation extractions stress-test it.
**Established:** May 5, 2026
**Purpose:** Standard format for `derivation-{module}-{NN}.md` files produced by the post-essay derivation extraction pass. Each such file extracts an axiom-to-theorem chain from a previously-published essay and records it in CRF-registry-compatible form.

---

## What this template is for

CRF cannot be axiomatized top-down without doing violence to the theological domain. The Christos Rigorous Framework was established (April 19, 2026) on the commitment that derivations are *structures of faithful response* rather than unique-answer deductions, and the open design questions in `CRF_operating_system.md` left axiom set v0.1 unresolved precisely because no first derivation had yet been attempted.

The derivation extraction pass solves both problems at once. Fellowship essays already produce derivation chains in their natural course — premises drawn from Scripture or doctrine, entailments unfolded into ethical or institutional consequences, conclusions registered as principles for action. The extraction pass takes a published essay, identifies its derivation chains, and reformats them into the structured ledger that CRF's theorem registry will eventually contain.

This is bottom-up axiomatization. Axioms are not declared in advance. They precipitate out of the extraction work as the premises that recur with high entailment-load across multiple derivations. Theorems precipitate as the derived propositions that survive scrutiny. The axiom set v0.1 will emerge from the first ten or so extractions, not from a single design session.

This template is the format the first three extractions will use. It is expected to be revised after those three. CPP's operating-system conventions took months to settle through the same iterative process; CRF should expect the same.

---

## File metadata

Each derivation file opens with frontmatter:

```yaml
---
derivation_id: CRF-DERV-{NNNN}
extracted_from: {source essay filename}
extracted_section: {section number or title within the source essay}
date_extracted: YYYY-MM-DD
extractor: {claude session hash, or human name}
status: DRAFT | UNDER_REVIEW | REGISTERED | RETIRED
review_notes: {optional pointer to review file}
candidate_axioms: [list of premise IDs this derivation rests on, even if axioms are not yet formally declared]
candidate_theorems: [list of derived-proposition IDs this derivation produces]
phronesis_density: HIGH | MEDIUM | LOW
related_derivations: [list of CRF-DERV-NNNN cross-references]
---
```

`derivation_id` uses zero-padded four-digit numbering. The first extraction is `CRF-DERV-0001`. The numbering is global across all source modules — there is no per-module counter — because CRF's whole point is to find cross-cutting structure.

`phronesis_density` is the extractor's honest assessment of how much of the derivation is *formal entailment* versus *practical wisdom needed to apply the formal entailment to a particular situation*. HIGH density means the derivation produces a structure that names what is required, prohibited, and faithful, with relatively narrow phronesis at the application boundary. LOW density means the formal structure produces a wide space of faithful responses and the actual choosing is mostly phronesis. Both are legitimate. The annotation matters because the registry needs to track where the formal system carries weight versus where it explicitly hands off.

---

## The three layers of epistemic warrant

Every step in a derivation chain carries one of three warrant-types, mirroring the Layer A/B/C decomposition that has been used informally in CPP work and is here adapted to the theological-ethical domain.

**Layer A — Definitional or axiomatic.** The step is true by what the terms mean or by appeal to a premise the derivation has declared (or a premise drawn from Scripture, the Christos AI Theological Grammar, or an established CRF axiom once the registry exists). Layer A steps cannot be wrong relative to the derivation; they can only be wrong if the underlying premise is wrong. This is the strongest warrant the system supports.

**Layer B — Structural or analogical.** The step depends on a structural feature of the situation, an analogical inference from one domain to another, or a pattern argument. *If the heart is sustained the institutions are sustained; if the heart is unchanged the institutions collapse into coercion* is a Layer B step — it is not provable from the premises alone but it is well-warranted by the structural pattern. Layer B steps are where CRF derivations do most of their actual work, and where the most disagreement is possible. *They are also the analog of CPP's Layer B gap — the place where imported reasoning has not been derived from CRF primitives, and where the programme will have its central long-term vulnerabilities.*

**Layer C — Phronetic or empirical.** The step depends on practical wisdom in the situation, on the testimony of changed lives, on observed historical or pastoral patterns. *Marriages are not generally saved by being prayed for in the form prayed* is a Layer C step — a thirty-year clinical observation, not a deduction. Layer C steps are not weaker than Layer A in the sense of being suspect. They are differently warranted — and the difference matters because Layer C steps are where the derivation is most exposed to context, situation, and the fit of general principle to particular case.

Every step in the derivation should be tagged with its layer.

---

## Section template

```markdown
# CRF-DERV-{NNNN}: {Derivation title}

[frontmatter as above]

## Source

Quote or paraphrase the originating passage from the source essay, with section reference. This anchor lets a reader trace the extracted derivation back to its essay-form expression.

## Premise(s)

State each premise the derivation rests on. Number them P1, P2, ... For each premise:
- Statement (one sentence, in CRF-registry form)
- Source (Scripture reference, doctrinal source, prior CRF axiom, or essay assertion)
- Layer of warrant (A, B, or C)
- Notes (whether this premise is a recurring candidate-axiom, what its known challenges are)

## Entailment chain

State each step of the derivation. Number them S1, S2, ... For each step:
- Statement (one sentence)
- Inferred from (which premises and prior steps)
- Inferential warrant (Layer A, B, or C)
- Brief justification (one or two sentences)

The chain should be readable in order. A reader who follows S1 → S2 → ... → Sn should arrive at the conclusion without needing to fill in unstated steps.

## Theorem(s)

State the derived proposition(s) the chain establishes. Each theorem candidate gets:
- ID (provisional: CRF-THEO-{NNNN}-candidate, formalized once the theorem registry is established)
- Statement (one sentence, in CRF-registry form)
- Scope (what range of cases the theorem applies to)
- Limits (what the theorem does not claim — explicit boundary)

## Phronesis notes

Per the third design commitment of CRF, every derivation explicitly names what the formal structure cannot supply. This section identifies:
- Which decisions in applying the theorem require practical wisdom that the structure does not encode
- Which contextual features of a situation modulate the application
- Which counter-cases or limit-cases the extractor can name where the theorem's straightforward application would be wrong

This section is not optional. A derivation without phronesis notes is incomplete and cannot be registered.

## Counterarguments and weak points

Honest naming of the strongest objections to the derivation. For each:
- Objection (one sentence)
- Where in the chain it bites (which Layer A premise, Layer B structural inference, or Layer C empirical claim it challenges)
- Provisional response (or acknowledgement that the objection is unresolved)

The symmetric-honesty protocol from CPP applies: standards applied to the work being reviewed are also applied to the work being extracted.

## Cross-references

- Related CRF derivations (with brief note on the relation)
- Source essay back-references (with section anchors)
- Theological Grammar positions touched (with version reference)
- CPP foundations cited at the ontological-ground layer (Level 4 in authors_voice.md), if any

## Extractor's notes

A brief paragraph (3-6 sentences) in which the extractor states what was hard about extracting this derivation, what judgment calls were made, what alternative readings were rejected and why, and what the extractor would want a reviewer to specifically check.
```

---

## Format-evolution policy

This template is v0.1. After the first three extractions:

- Sections that were never used will be dropped or made optional.
- Sections that proved insufficient will be expanded.
- New sections that the extraction work demanded will be added.
- The Layer A/B/C decomposition will be reviewed for fit; if it fragments into more than three categories naturally, it will be revised.
- The frontmatter fields will be reviewed; new fields may be added; unused ones removed.

Format revisions are tracked in this template's CHANGELOG section (to be added at first revision). The first three extractions are conducted with v0.1 as written, even where v0.1 is awkward — the awkwardness is data about what the template needs to become.

---

## What the extraction pass does NOT do

The extraction pass is not the same as writing the source essay. The essay's job is to be a fellowship essay — to think through a question with the warmth, register, and rhetorical texture appropriate to fellowship discussion. The extraction's job is to formalize the entailments that the essay implicitly executed.

A good extraction does not improve on the essay's argument. It clarifies the structure of the argument the essay made. If the extraction discovers that the essay's argument is weaker than it appears in essay prose — as Section IV of `260503-after_diagnosis_real_deliverable.md` may turn out to be in places — that is a finding to record honestly, not a reason to repair the argument inside the extraction document.

The extraction pass is a *test of the essay's derivational integrity.* The test is conducted in good faith and reported in good faith.

---

## Storage and registration

Extraction files live at:

```
CRF_christos_rigorous_framework/derivations/derivation-CFE-260503.md
CRF_christos_rigorous_framework/derivations/derivation-{module}-{date or essay code}.md
...
```

The naming uses the source essay's date prefix (or other unambiguous identifier from the source essay's frontmatter), not the global derivation-id. The global derivation-id is metadata inside the file. This makes filesystem browsing trace cleanly back to the source essay.

Once the theorem registry is established (after the first ten or so derivations), each derivation will be cross-referenced from a registry index file. Until then, the `derivations/` folder is its own index.

Extractions begin in `DRAFT` status. They graduate to `UNDER_REVIEW` when ready for fellowship or AI-team review, and to `REGISTERED` when reviewed and accepted into the formal corpus. `RETIRED` status is for derivations later found to be superseded — they are not deleted, since the history of why they were retired is itself part of the corpus.

---

*"The /RM project, in its rigorous expression, is a theological/theoretical proof of the correctness of a given action ... the theorem of right action in any situation."* — Thomas Lee Abshier, April 19, 2026
