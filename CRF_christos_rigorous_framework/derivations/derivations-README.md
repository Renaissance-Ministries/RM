# CRF Derivations

**Established:** May 5, 2026
**Status:** First worked example registered; format v0.1 under stress-test.

---

## What this folder holds

This folder holds the structured-derivation files produced by the **derivation extraction pass** — the post-essay analysis that pulls axiom-to-theorem chains out of published Renaissance Ministries essays and reformats them for CRF's eventual theorem registry.

Each file in this folder extracts one derivational section of one source essay. The extraction is conducted *after* the essay is published. The essay's job is to be a fellowship essay; the extraction's job is to formalize the entailments the essay implicitly executed.

The format is specified in `../templates/derivation_extraction_template.md`. The format is version v0.1 and is expected to be revised after the first three extractions stress-test it.

---

## Why this exists

CRF was established (April 19, 2026) on three design commitments — derivations as structures of faithful response rather than unique-answer deductions, every axiom carrying a defense document, phronesis as the formal completion of any derivation. The April 23 setup session left axiom set v0.1 as an open design question, with the explicit recommendation that the system shape itself through three or four derivations before formalizing methodology.

The derivation extraction pass is how that recommendation operates. Rather than declaring axioms top-down and then deriving from them, the extraction pass takes essays that have already done derivational work in their natural course and pulls out the structure. The recurring premises across several extractions are the candidate axioms. The recurring derived propositions are the candidate theorems. The CRF axiom set will precipitate from the bottom up.

This is the same pattern by which mathematical fields have historically axiomatized themselves — Euclid did not invent geometry, he extracted the minimal premise set from centuries of working theorems and asked *what minimal set entails all of this?* CRF is following the same pattern in the theological-ethical domain.

---

## Naming and ID conventions

**Filename:** `derivation-{source-module-code}-{source-essay-date}.md` where the source-module-code is CFE (or CCC, CHR, etc., per the source essay's frontmatter `module:` field) and the source-essay-date is the YYMMDD prefix from the source essay's filename.

**Examples:**
- `derivation-CFE-260503.md` — first extraction; from the May 3 *After the Diagnosis* fellowship essay.
- `derivation-CFE-260430.md` — pending; from the April 30 *Eight Strongholds* essay.

If a single essay has multiple extractable sections, append `-{section-letter}`:
- `derivation-CFE-260503-a.md` — Section IV
- `derivation-CFE-260503-b.md` — Section IX (the Acts-vs-Marx digression, when extracted)
- `derivation-CFE-260503-c.md` — Section X (the creation-polarity cosmology, when extracted)

**Internal ID:** Each derivation carries a global-counter `derivation_id` of the form `CRF-DERV-{NNNN}` in its frontmatter. Numbering is global across all source modules — there is no per-module counter — because CRF's purpose is to find cross-cutting structure. The first derivation is `CRF-DERV-0001`. Filename and ID are independent: filename traces back to source essay; ID traces to extraction-corpus position.

---

## Status lifecycle

Each derivation moves through four statuses:

- **DRAFT** — initial extraction, not yet reviewed.
- **UNDER_REVIEW** — submitted for fellowship or AI-team review.
- **REGISTERED** — reviewed and accepted; candidate theorems eligible for promotion to the CRF theorem registry once that registry is established.
- **RETIRED** — superseded by a later derivation; preserved for the historical record rather than deleted.

Status is tracked in each derivation's frontmatter `status:` field.

---

## Current contents

| File | Source | Status | Notes |
|------|--------|--------|-------|
| `derivation-CFE-260503.md` | May 3 fellowship essay, Section IV | DRAFT | First worked example. Stress-tests format v0.1. Five candidate theorems. Phronesis-density: MEDIUM. |

---

## Pending extractions

The May 3 essay's frontmatter lists three `crf_derivation_candidates`:
- Section IV — extracted as `derivation-CFE-260503.md` ✓
- Section III — pending (the institutionalization argument)
- Section X — pending (the creation-polarity cosmology)

The April 30 essay (Eight Strongholds) is also a strong candidate; its central argument that the eight cultural traits are spirits-not-opinions is itself a derivation chain.

The July 2025 (or earlier) Testimony-versus-Religious-Test addendum from Thomas's April 18 essay was named in the April 19 establishment session as the original first-derivation candidate; that extraction is also pending.

The format-evolution policy in `../templates/derivation_extraction_template.md` calls for the first three extractions to be conducted with v0.1 as written, even where v0.1 is awkward, before any format revisions. After three are completed, the template's CHANGELOG section will be added and v0.2 will be drafted.

---

## Read first

Before contributing an extraction:

1. `../templates/derivation_extraction_template.md` — the format specification.
2. `derivation-CFE-260503.md` — the worked example showing how to apply the format honestly, including how to tag Layer B steps that look weaker than their essay-prose form.
3. `../CRF-README.md` — the three design commitments. Especially the third (phronesis as completion); a derivation without phronesis notes is incomplete.
4. The source essay being extracted, in full. *Do not extract from a section in isolation; the surrounding essay context often disambiguates which Layer applies to a given step.*

---

*"Iron sharpeneth iron; so a man sharpeneth the countenance of his friend."* — Proverbs 27:17
