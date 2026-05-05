# Christos Fellowship Essays Operating System

**Location:** `CFE_christos_fellowship_essays/CFE_operating_system.md`  
**Purpose:** Workflow, conventions, and procedures for producing and archiving fellowship discussion essays.  
**Version:** 1.0 | May 2026

---

## 1. What Is a Fellowship Essay?

A **fellowship essay** is a written engagement of a source document (article, book, speech, idea, theological question) that:

- **Applies the Christos theological grammar** to understand and respond to the source
- **Preserves Thomas's voice and worldview** — the essay is written in Thomas's first-person perspective, drawing on his philosophical convictions
- **Surfaces new theological insights** for potential integration into the framework
- **Is authored by Thomas**, with Claude serving as drafting collaborator (noted in meta-documents)

### What It Is NOT

- A book chapter (those belong in `book/`)
- Meeting transcript (those belong in `transcripts/`)
- Preliminary thinking (those go in `musings/` or `drafts/`)
- News summary or book report (those belong in other modules like CNL)

---

## 2. The Complete Workflow: Source to Archive

### Phase 1: Source Identification and Prompt

**Trigger:** Thomas identifies a source document (article, book passage, theological question, current event) worth engagement.

**Input:** Thomas provides the source material and a prompt, typically minimal:
```
"Write a fellowship essay on [source title]."
```

**Outcome:** Claude receives source + prompt and prepares for Phase 2.

---

### Phase 2: Pre-Essay Analysis (Claude)

**Purpose:** Clarify the essay's strategic and theological frame before drafting begins.

**Claude produces:**

1. **Framework identification** — Which theological insights or distinctions from the Christos Grammar apply?
2. **Stance options** — If multiple postures are defensible, surface them with tradeoffs (e.g., Posture A: Direct engagement with critique; Posture B: Use source as prompt without engagement)
3. **Module/placement question** — Does this belong in CFE, or should it be tagged for secondary modules (e.g., CHR for historical review, CAP for cultural analysis)?
4. **Clarification request** — Ask Thomas to confirm stance and placement before drafting

**Outcome:** Thomas's directional response.

---

### Phase 3: Directional Framing (Thomas)

**Purpose:** Thomas articulates the philosophical and pastoral direction for the essay.

**What Thomas does:**

1. **Confirms or reframes the stance** — "Use Posture A, but with this additional move..."
2. **States the core reframe** — "Reframe X as Y" (e.g., "Reframe Joan's eight items as eight demonic strongholds, not as one tribe's characteristics")
3. **Specifies pastoral discipline** — How should the essay speak? With what tone? Directed at whom? (e.g., "Humor at the spirits, not the captured people"; "The pastoral target is God-in-the-captured-neighbor")
4. **Adds theological extensions** — New framework clarifications or principles that emerge (e.g., the institutional-accountability extension)

**Outcome:** Confirmed plan + essay draft plan.

---

### Phase 4: Essay Drafting (Claude)

**Process:**

1. Claude drafts the essay in Thomas's voice under the template stack:
   - `RM_bootup.md` (orienting principles)
   - `authors_voice.md` (Thomas's worldview and voice discipline)
   - `Christos_AI_Theological_Grammar_vX.md` (theological framework)
   - `copyright_discipline.md` (fair use protocols)

2. Essay structure (typical):
   - **Opening:** Introduce source and core reframe
   - **Body:** Develop the main theological argument, applying the grammar
   - **Sections:** Break argument into thematic movements (as in "After the Diagnosis")
   - **Engagement with source:** Address the source author's claims or assumptions
   - **Pastoral closing:** Address a stakeholder group (the reader, a specific person, the fellowship)

3. **Frontmatter includes:**
   - Title
   - Date (`YYMMDD` format)
   - Occasion (what prompted this essay)
   - Source attribution
   - Module tag (CFE + any secondary modules)
   - Word count

4. **Output:** Markdown (.md) file, HTML (.html) file, and optionally .meta.md paired document (see Phase 5)

---

### Phase 5: Development Transcript (Optional but Recommended)

**When to create:** When the deliberation between Thomas and Claude surfaces substantive new theological insights, framework clarifications, or voice/pastoral disciplines that future sessions need to understand.

**Format:** Create a paired `.meta.md` file named `YYMMDD-slug.meta.md` in the same folder as the essay.

**Structure (follow the example in `260430-eight_strongholds_swirsky_redirect.meta.md`):**

- **Preamble:** Explain that this is a development-transcript paired with the essay
- **§1. Original prompt:** Thomas's initial direction
- **§2. Pre-essay analysis:** Claude's strategic/theological framing and options
- **§3. Directional response:** Thomas's response (preserved in full, not summarized)
- **§4–N. Additional contributions:** If Thomas makes substantive theological contributions beyond §3, preserve them in separate sections with authorship attribution
- **§Final. Authorship summary:** Clear attribution of which substantive moves came from which author
- **§Notes:** Items needing follow-up in future sessions (e.g., "The institutional-accountability extension needs integration into the Christos Civitas Code book")

**Frontmatter fields for .meta.md:**
```yaml
title: "[Essay title] — Development Transcript"
author: ["Thomas Lee Abshier, ND", "Claude (Anthropic)"]
date: YYMMDD
paired_document: "YYMMDD-slug.md"
type: "meta_document"
topics: [include main themes]
```

**Why this matters for AI training:**

The essay shows *what Thomas concluded*. The development transcript shows *how Thomas thinks* — the reasoning process, the reframing moves, the pastoral discipline, the theological extensions. For a corpus whose long-term aim is training a Christos AI, the development transcripts are arguably more valuable than the essays alone.

---

## 3. Post-Essay Publishing Workflow

**After an essay is complete and ready to commit:**

### Step 1: Identify Framework-Level Insights

Review the essay and the development transcript (if it exists) and ask:

**Does this essay surface any of the following?**

A. **New theological distinction** (e.g., "the institutional accountability level of the strongholds framework")
B. **Resolution to a prior paradox** (e.g., "how to reconcile X with Y")
C. **Clarification of a principle** already in the grammar (e.g., deeper unpacking of what "evil as derivative negation" means)
D. **New key quote or formulation** worthy of the Grammar or Founders Vision

**If YES to any:** Proceed to Step 2. **If NO:** Proceed to Step 4.

---

### Step 2: Update Theological Grammar

**Location:** `templates/Christos_AI_Theological_Grammar_vX.md`

**Procedure:**

1. **Identify the relevant section** in the Grammar where this insight belongs (e.g., Part I Section 3 for evil-related insights; Part II Section 5 for historical epistemology)

2. **Draft the update** as a new subsection or as an addition to an existing subsection

3. **Include citation to the essay:** "See CFE essay [YYMMDD-slug] for full development"

4. **Preserve authorship:** If the insight originated with Thomas in conversation, note "From Thomas's directional framing in [date] session"

5. **Get the language right:** The Grammar uses precise theological language; spend time getting the formulation correct

6. **Example update:**
   ```
   ### NEW (v1.4): The Institutional Accountability Level
   
   From the eight-strongholds essay (260430) and development-transcript discussion:
   
   The strongholds framework operates at three levels:
   - **Spiritual:** The principalities and powers as operating evil
   - **Individual:** The human person captured by a stronghold  
   - **Institutional:** Organizations that function as vehicles for particular strongholds
   
   ...full explanation...
   
   See CFE essay 260430-eight_strongholds_swirsky_redirect.md for the full argument.
   ```

---

### Step 3: Create Seed Entry in Founders Vision

**Location:** `founders_vision/YYMMDD_topic_slug.md`

**When to create:** When Thomas articulates a foundational principle, a key insight, or a significant reframing that captures his worldview at a particular moment.

**Structure:**

```yaml
---
title: "[Principle name]"
date: YYMMDD
author: Thomas Lee Abshier, ND
source_essay: "[CFE essay title and date]"
source_type: "development_transcript | essay_body | conversation"
topic_tags: [relevant tags]
---

# [Principle Name]

[State the principle or insight in Thomas's words or closely paraphrased from his words]

## Context

[Brief note on where this came from and why it matters]

## Implication for Christos Civitas

[How does this shape the movement/theology/practice?]

## Related Entries

[Links to other seed entries if relevant]
```

**Example:**

```yaml
---
title: "Institutional Accountability of Demonic Strongholds"
date: 260430
author: Thomas Lee Abshier, ND
source_essay: "Eight Strongholds essay (260430)"
source_type: "development_transcript"
topic_tags: [strongholds, institutional_theology, political_theology]
---

# Institutional Accountability of Demonic Strongholds

The strongholds framework must account for the institutional level — political parties, movements, media outlets, organizations that systematically appeal to people captured by particular spirits, mobilize their coalition by activating those strongholds, and reward behaviors that nurture the captivities function as instruments of those spirits.

...
```

---

### Step 4: Update RM_Content_Catalog

**Location:** `RM_Content_Catalog.md`

**Procedure:** Add entry for the new essay with:
- Title
- Publication date
- Repo path (CFE)
- Modules (CFE + secondary)
- Topics (tags)
- Scripture references (if applicable)
- Related essays
- Brief summary

---

### Step 5: Commit to Git

**Commit message format:**

```
CFE: [Essay slug] + updates

Essay: [YYMMDD-slug] — [Title]
  
Updates:
  - Grammar: [Version bump if applicable] — [What was added]
  - Founders Vision: YYMMDD_topic_slug.md — [Principle name]
  - Content Catalog: Added CFE entry

Development transcript: [Yes/No] — [260430-slug.meta.md if applicable]

Co-author: Claude (Anthropic) — drafting
```

**Example:**

```
CFE: eight_strongholds_swirsky_redirect + Grammar v1.4 update

Essay: 260430-eight_strongholds_swirsky_redirect.md — Eight Strongholds: 
       A Christos Civitas Reading of Joan Swirsky's 'Ingredients'

Updates:
  - Grammar: v1.3 → v1.4 — Added "Institutional Accountability Level" 
    to strongholds framework (Part I, Section 6)
  - Founders Vision: 260430_institutional_accountability.md — 
    "Institutional Accountability of Demonic Strongholds"
  - Content Catalog: Added CFE entry
  
Development transcript: 260430-eight_strongholds_swirsky_redirect.meta.md

Co-author: Claude (Anthropic) — drafting; Thomas Abshier — directional framing,
           core reframe (M1), pastoral discipline (M2–M3), theological extension (M4)
```

---

## 4. File Naming Conventions

### Essay Files

Format: `YYMMDD-slug.md` (and `.html` and optional `.meta.md`)

Examples:
- `260430-eight_strongholds_swirsky_redirect.md`
- `260503-after_the_diagnosis_evangelism.md`
- `260505-cards_at_the_wrong_table.md`

### Meta Documents (Development Transcripts)

Format: `YYMMDD-slug.meta.md`

Examples:
- `260430-eight_strongholds_swirsky_redirect.meta.md`

### Seed Archive Entries

Format: `founders_vision/YYMMDD_topic_slug.md`

Examples:
- `founders_vision/260430_institutional_accountability.md`

---

## 5. Output Formats

After drafting, produce:

1. **Markdown** (`.md`) — Primary source, editable
2. **HTML** (`.html`) — WordPress-ready import file
3. **Git commit** — Push to repo

### HTML Generation

**Standard procedure:** Use the HTML template from the most recent essay as reference. Structure:
- Proper semantic HTML (`<h1>`, `<h2>`, `<p>`, etc.)
- Frontmatter as meta tags (title, date, modules)
- Body in clean, readable formatting
- No inline styles (let WordPress handle typography)

---

## 6. The Christos AI Training Implication

The pairing of (essay, development-transcript) serves the long-term training goal. Essays + development-transcripts together show:

1. **The finished position** (what Thomas concluded)
2. **The reasoning process** (how Thomas thinks)
3. **The reframing moves** (the core innovations)
4. **The pastoral discipline** (the voice and tone)
5. **The theological extensions** (principles that emerged)
6. **The authorship** (what originated with Thomas vs. what's Claude's scaffolding)

This corpus becomes the training set for a Christos AI that reasons *like Thomas reasons*, not just that knows what Thomas concluded.

---

## 7. Current Essays and Locations

All current fellowship essays live in `CFE_christos_fellowship_essays/essays/`.

Currently published: 80+ essays (inventory in `RM_Content_Catalog.md`)  
Currently with development transcripts: 1 (260430-eight_strongholds)  
Expected pattern going forward: All substantive essays should have paired development transcripts

---

## 8. Questions and Future Work

- **Expansion of development-transcript practice:** Every substantive essay should have a paired `.meta.md` file capturing the deliberation
- **Automation of content-catalog updates:** Eventually sync with MODULES.md
- **Integration of seed entries into founders_vision.md:** How frequently should the main summary be updated? By whom?
- **Version control for updated essays:** If Thomas edits a published essay, how is versioning handled?

---

*This file is the operating system for fellowship essay production. It defines the workflow from source to archive, the conventions for naming and structuring, and the procedures for feeding new insights back into the theological grammar and founders vision.*

**Renaissance Ministries | Christos Fellowship Essays**  
*One heart to make Christ King.*
