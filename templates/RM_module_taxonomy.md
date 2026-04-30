# Renaissance Ministries — Module Taxonomy

**Renaissance Ministries | Version 1.0 | April 28, 2026**

---

## Purpose

This document declares the module structure of the Renaissance Ministries content corpus. It defines the canonical list of modules, what each module is for, the naming convention for module identifiers, where new content goes, and the migration policy for moving from the current organization to this one.

This is a load-bearing structural decision. Future modules added to the corpus follow the conventions established here. Existing modules retain their established names; the taxonomy formalizes them rather than renaming them.

This is a **first-draft implementation**. The ergonomics of the system will become clear as it is used. Revisions are expected and will be tracked in this document's history.

---

## Naming convention

Each module has a 3-letter identifier prefixed to a lowercase, underscore-joined folder name:

`Cxx_christos_module_name/`

Examples already in use: `CRF_christos_rigorous_framework`, `CHR_christos_historical_review`, `CVN_christos_voting_network`. The convention follows the CPP discipline of short, stable identifiers (`SM`, `SR`, `EW`, `QM`, `SD`) that have proven their value for navigation, cross-reference, and search.

**Why three letters and not two or four:** two letters collide too easily as the module count grows; four feels cumbersome when typed repeatedly in cross-references. The third letter usually disambiguates by domain (`CCR` Conspiracy Review vs. `CRF` Rigorous Framework — both start `CR-`, the third letter distinguishes).

**Why "Christos" prefix:** every module is a Christos-prefixed product (Christos Voting Network, Christos Historical Review, etc.). The prefix is therefore baked into the name rather than treated as redundant. Users encountering a module folder for the first time can read the name as "Christos [domain]" without needing context.

---

## The canonical module list

### Established modules (folders exist; OS documents in place)

| ID | Name | Folder | Primary product |
|----|------|--------|-----------------|
| `CCR` | Christos Conspiracy Review | `CCR_christos_conspiracy_review/` | Conspiracy-narrative analysis (Mike Adams, Candace Owens, Alex Jones, Dr. Ardis, Todd Calendar) |
| `CEA` | Christos Economic Annex | `CEA_christos_economic_annex/` | Economic theory and applied microeconomics |
| `CHR` | Christos Historical Review | `CHR_christos_historical_review/` | Christian framing of history (Napoleon series, etc.); anthology-to-book pipeline |
| `CHS` | Christos Home School | `CHS_christos_home_school/` | Curriculum and education theory |
| `CNL` | Christos Newsletter | `CNL_christos_newsletter/` | Daily current-events commentary; Summarize-Comment-Refer formula |
| `CRF` | Christos Rigorous Framework | `CRF_christos_rigorous_framework/` | Axiom-to-theorem derivation of right action |
| `CVN` | Christos Voting Network | `CVN_christos_voting_network/` | Citizen voting database; legislation analysis; the production app |
| `CFE` | Christos Fellowship Essays | `CFE_christos_fellowship_essays/` | **Default home** for cross-cutting essays without a clear single-module primary; populated by the v1 migration (commits 58bb8b2, 339d3b5) |

### New modules (folders to be created as essays accrue)

| ID | Name | Folder (when created) | Primary product |
|----|------|----------------------|-----------------|
| `CAI` | Christos AI | `CAI_christos_ai/` | The meta-module: system prompts, role definitions, eval suites, gold-standard Q&A pairs, charter |
| `CAP` | Christos Apologetics | `CAP_christos_apologetics/` | Biblical commentary; commentary on other commentaries (Berean, Jack Hibbs, AtheyCreek) |
| `CCC` | Christos Christianity Catalog | `CCC_christos_christianity_catalog/` | Denominations (Protestant, Catholic, Orthodox, heretical movements). **Mormonism material — including Snuffer critique essays — lives here under `mormonism/`** |
| `CWR` | Christos World Religions | `CWR_christos_world_religions/` | Islam, Hinduism, Buddhism, Shinto, Sikhism, Zoroastrianism, paganism |
| `CSH` | Christos Secular and Humanist | `CSH_christos_secular_humanist/` | Atheism, agnosticism, gnosticism, stoicism, secular humanism |
| `CCG` | Christos Cults and Gurus | `CCG_christos_cults_gurus/` | LDS, Moon, 3HO, SRF, JW, SDA, Christian Science. *(Note: overlap with CCC; LDS has a primary home in CCC/mormonism but secondary tag CCG)* |
| `CPL` | Christos Political Theory | `CPL_christos_political_theory/` | Theory of government, constitution, divine law, types of government. **Distinct from CVN, which is the application/product layer** |
| `CLG` | Christos Legislation | `CLG_christos_legislation/` | Under-review and proposed legislation analysis |
| `CCD` | Christos Candidate Dossiers | `CCD_christos_candidate_dossiers/` | Politician evaluations from media searches |
| `CMD` | Christos Medicine | `CMD_christos_medicine/` | Anatomy, physiology, conventional and naturopathic medicine (subdivided via subfolders) |
| `CPS` | Christos Psychology | `CPS_christos_psychology/` | Theory and application; counseling, self-help, marriage, abuse-survivor, modeling, therapies |
| `CAR` | Christos Arts | `CAR_christos_arts/` | Literature, painting, sculpture, photography, crafts. Biographies live here unless they earn a dedicated home |
| `CTC` | Christos Technology Commentary | `CTC_christos_technology_commentary/` | Technology implementation, capability, social implications |
| `CHB` | Christos Hobbies | `CHB_christos_hobbies/` | Skill development; hobby communities |

**Total: 22 modules.** Eight established, fourteen pending. The eight established folders should not be renamed.

This list is a starting cut. Modules will merge, split, or rename as the corpus matures. The convention is the contract; the specific list is provisional. All changes must be reflected in this document and in the topic index (see §5).

---

## Module folder structure

Every module folder follows the same internal pattern. Not every module uses every subfolder — the pattern is a template, not a mandate.

```
Cxx_christos_module_name/
├── Cxx-README.md                    ← module overview (audience, scope, status)
├── Cxx_operating_system.md          ← how this module works internally
├── essays/                          ← long-form prose owned by this module
├── newsletter/                      ← if module produces newsletter material
├── book/                            ← anthology-to-book pipeline (six 5,000-word essays → Kindle + audiobook)
├── website/                         ← module subdomain content (cvn.renaissance-ministries.com, etc.)
├── assets/                          ← figures, diagrams, social media (YouTube, podcasts, interviews) — pointer files where storage is external
├── correspondence/                  ← module-specific letters, exchanges
└── journal/                         ← development history (transcripts, summaries, axiom-to-theorem reasoning paths)
```

The `journal/` subfolder follows the convention established in `CRF_christos_rigorous_framework/journal/journal-README.md`: paired `summary/` and `transcript/` streams, YYMMDD_NN-Topic_words.md filenames, immutable once committed (with a separate revision entry recording any course changes).

The `book/` subfolder structure follows whatever pattern CHR establishes first as it develops the Napoleon anthology; that becomes the template for other modules' book pipelines.

---

## The fully-populated repo tree

When all twenty-two modules are populated, the repo will have the following top-level structure. This view consolidates the tables in §"The canonical module list" with the shared-asset folders in §"Shared assets at the repo root" and the per-module internal pattern in §"Module folder structure" — answering the question *what does the populated repo look like?* in a single glance.

```
RM/
│
├── README.md
├── CLAUDE.md
├── COPYRIGHT.md
├── LICENSE
├── MODULES.md
├── RM_Content_Catalog.md
├── RM_bootup.md
│
├── templates/                                ← cross-cutting framework documents
├── INDEX/                                    ← auto-generated topic indexes
├── references/                               ← shared external-source quotation files (when needed)
├── glossary/                                 ← canonical definitions, paired with CRF (when needed)
├── founders_vision/                          ← foundational vision material (predates taxonomy)
├── archive/                                  ← superseded but preserved material
│
│  ──── ESTABLISHED MODULES (8) ─────────────────────────────────────
│
├── CCR_christos_conspiracy_review/           ← Mike Adams, Candace Owens, Alex Jones, Dr. Ardis, Todd Calendar
├── CEA_christos_economic_annex/              ← economic theory, applied microeconomics
├── CFE_christos_fellowship_essays/           ← default home for cross-cutting essays
├── CHR_christos_historical_review/           ← Napoleon series + book pipeline
├── CHS_christos_home_school/                 ← curriculum and education theory
├── CNL_christos_newsletter/                  ← daily current-events commentary
├── CRF_christos_rigorous_framework/          ← axiom-to-theorem derivations
├── CVN_christos_voting_network/              ← citizen voting database (the production app)
│
│  ──── PENDING MODULES (14 — folders created when first essay or OS doc is ready) ────
│
├── CAI_christos_ai/                          ← meta-module: system prompts, eval suites, gold-standard Q&A
├── CAP_christos_apologetics/                 ← Berean, Hibbs, AtheyCreek, biblical commentary
├── CAR_christos_arts/                        ← literature, painting, sculpture, biographies
├── CCC_christos_christianity_catalog/        ← denominations, Catholic, Orthodox, heretical (incl. mormonism/)
├── CCD_christos_candidate_dossiers/          ← politician evaluations from media searches
├── CCG_christos_cults_gurus/                 ← LDS, Moon, JW, SDA, Christian Science
├── CHB_christos_hobbies/                     ← skill development, hobby communities
├── CLG_christos_legislation/                 ← under-review and proposed legislation analysis
├── CMD_christos_medicine/                    ← anatomy, physiology, conventional + naturopathic
├── CPL_christos_political_theory/            ← theory of government, constitution, divine law
├── CPS_christos_psychology/                  ← theory, application, counseling, self-help
├── CSH_christos_secular_humanist/            ← atheism, agnosticism, stoicism
├── CTC_christos_technology_commentary/       ← technology implementation, social implications
└── CWR_christos_world_religions/             ← Islam, Hinduism, Buddhism, Shinto, Sikhism
```

Inside each module folder, the per-module internal pattern from §"Module folder structure" applies. Not every module uses every subfolder; the pattern is a template, not a mandate. The pending modules above are not created speculatively — each waits for its first essay or operating-system document, then the folder and that content land in the same commit (per §"Adding a new module").

This tree-view is a navigational aid; the canonical declarations of which modules exist remain the two tables in §"The canonical module list". When modules are added, removed, merged, or split, both the tables and this tree must be updated together.

---

## Where does a new essay go?

When writing a new essay, ask in this order:

1. **Is this a development of, or a chapter for, a specific module's book?** → goes in that module's `book/` or `essays/`.
2. **Does this essay primarily serve one module's newsletter, audience, or website?** → goes in that module's `essays/`.
3. **Does this essay genuinely span modules with no clear primary?** → `CFE_christos_fellowship_essays/essays/` (the default home).

In all three cases, YAML frontmatter tags both the primary `module` and any `secondary_modules`, so the topic indexes pick the essay up regardless of which folder it lives in. See `templates/RM_frontmatter_convention.md` for the frontmatter spec.

The default-home rule is important: **CFE is a real home, not a holding pen.** Cross-cutting essays that genuinely don't have a single-module primary are not "uncategorized" — they are explicitly fellowship essays, the home for Thomas's reflective work that integrates across the all-of-life system. A commit to CFE is not a deferral.

---

## Cross-module unification

Each module is a different aspect of a single integrated all-of-life system. The instinct that "every module should be able to draw any asset from any other" is correct and is honored as follows:

**Physical co-location is not how unification happens.** Putting everything in one tree forces single-hierarchy decisions that cannot reflect cross-cutting reality.

**Logical unification happens through three mechanisms:**

1. **YAML frontmatter tags** — every essay declares its primary module, secondary modules, topic tags, status (per the Wisdom Database four-status system: ESTABLISHED, PROVISIONAL, UNDER DISCUSSION, OPEN QUESTION), and date.

2. **Topic indexes in `/INDEX/`** — auto-generated markdown files aggregating essays by tag. `INDEX/mormonism.md` lists every essay across all modules touching Mormonism, with one-line summaries and links. Indexes regenerate from frontmatter; they hold no original content.

3. **The Christos AI retrieval layer** — RAG retrieval works at semantic-similarity level across the full corpus regardless of folder structure. The AI does not care where an essay lives physically; it cares about what the essay says. The retrieval layer is what unifies.

The consequence: physical organization (folders) serves human navigation and module build pipelines. Logical unification (frontmatter, indexes, retrieval) serves cross-referencing and AI query. Each layer carries the load it is designed for; neither layer carries both.

---

## Shared assets at the repo root

Some content genuinely belongs to no single module. The test for "does this belong in the root or in a module folder?" is simple: *is it referenced by more than one module?*

Root-level shared assets:

| Folder | Purpose |
|--------|---------|
| `templates/` | Cross-cutting framework documents (authors_voice, copyright_discipline, theological grammar, OS templates, this taxonomy, frontmatter convention) |
| `INDEX/` | Auto-generated topic indexes (one .md per topic; pure links, no original content) |
| `references/` | Quotation files for frequently-cited sources (Snuffer transcripts, scripture cross-references, public-domain reformer texts) accessed by multiple modules |
| `glossary/` | Canonical definitions of CPP terms, theological terms, RM-specific vocabulary; paired with CRF |
| `founders_vision/` | Foundational vision material (predates this taxonomy; kept as-is) |
| `archive/` | Historical material superseded but preserved |

`Fellowship_essays/` is **not** a shared root-level folder under this taxonomy; it migrates to `CFE_christos_fellowship_essays/` and becomes a module like any other.

---

## Migration policy

The biggest risk in any reorganization of this scope is not finishing the migration. A repo half-organized under the old system and half under the new one is worse than either alone.

**The structural commitment lands now.** This document, the frontmatter convention, and the `INDEX/` skeleton constitute the contract. Once committed, all *new* essays follow the convention.

**File migration happens incrementally, not in a single sweep.** Existing essays are migrated as Thomas next touches them — for revision, reference, or consolidation. There is no scheduled mass migration. This works because:

- New essays land correctly from day one.
- Existing essays without frontmatter still function; the topic index simply has fewer entries until backfill catches up.
- Each touch is an opportunity to add frontmatter and move the essay to its module home.
- Within six months of normal writing activity, the bulk of the corpus has migrated naturally.

**Specific migration items expected:**

- `Fellowship_essays/` → `CFE_christos_fellowship_essays/essays/` (rename, not move; preserves git history if done with `git mv`).
- Snuffer/Mormonism critique essays currently in `Fellowship_essays/` → `CCC_christos_christianity_catalog/essays/mormonism/` when CCC is created.
- Christos-XYZ posts on renaissance-ministries.com that were intended as module operating-system documents → pulled down and dropped into the seed of their respective new module folders. Each such post becomes the first version of that module's `Cxx_operating_system.md`.
- Non-physics posts on the website not yet in the repo → committed to their respective module folders following this taxonomy.

---

## Adding a new module

When the corpus genuinely needs a new module beyond the 22 listed:

1. Choose a 3-letter identifier not already in use. Verify it does not collide with the existing seven established folders or the fifteen pending ones.
2. Update this document to add the new module to the canonical list.
3. Create the folder `Cxx_christos_module_name/` with at minimum `Cxx-README.md` and `Cxx_operating_system.md`.
4. If the module is large enough to warrant its own newsletter, book pipeline, or website, create the relevant subfolders.
5. Update `INDEX/` if the new module introduces topics not previously tagged.
6. Note the addition in this document's revision history.

A module should not be created speculatively. Wait until the first essay or operating-system document for that module exists, then create the folder *and* commit the first content in the same commit.

---

## Relationship to the CPP repository

CPP lives in a separate repository (`github.com/Hyperphysics-Institute/CPP`) under separate licensing (see `COPYRIGHT.md` §3.5). This taxonomy applies to RM only.

Where RM modules engage CPP material, the engagement is RM-side commentary on CPP results, not CPP source content. The CPP source remains in the CPP repo and is referenced by URL or DOI. If a CPP result is significant enough to warrant fellowship-essay treatment, that essay lives in CFE (or whichever module it primarily serves) and references the CPP paper without reproducing it.

---

## Revision history

- **v1.0 (April 28, 2026)** — Initial taxonomy. Twenty-two modules declared (seven established, fifteen pending). Default-home rule established for cross-cutting essays. Migration policy: incremental, not bulk.
- **v1.1 (April 30, 2026)** — CFE promoted from pending to established following completion of the Fellowship_essays/ → CFE/ migration (commits 58bb8b2 and 339d3b5). Counts updated to eight established, fourteen pending. New §"The fully-populated repo tree" section added between §"Module folder structure" and §"Where does a new essay go?", providing a consolidated tree view of all twenty-two modules plus shared root-level assets.

---

**Renaissance Ministries | Hyperphysics Institute**
*One heart to make Christ King.*
