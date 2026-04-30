---
title: "Christos Voting Network - Version 2 - Judgment and Persuasion"
author: "Thomas Lee Abshier, ND"
date: 2026-04-09
module: CVN
topics: [voting_network, website_seed, v2, judgment_persuasion]
status: ESTABLISHED
type: essay
source_url: "https://renaissance-ministries.com/2026/04/09/christos-voting-network-version-2-judgment-and-persuasion/"
wordpress_post_id: 3718
import_notes: "override: Christos Voting Network V2 (Judgment & Persuasion) — CVN website material"
---
# Christos Voting Network — Version 2 Operating System

## From Vision to Infrastructure

**Thomas Lee Abshier, ND • Isak Gutierrez** **Renaissance Ministries** **April 2026 — Condensed Edition**
> *"Buy the truth, and sell it not; also wisdom, and instruction, and understanding."* — Proverbs 23:23

---

## 1. The Vision in One Page

The Christos Voting Network is a system for **informed, named, ongoing citizen participation** in the moral and political questions that shape our common life. It is not a political party. It is not a polling service. It is a **permanent infrastructure for grassroots sanctification of the public square**.
The system has five interlocking subsystems, each feeding the others:

| Subsystem | Function | Output |
| --- | --- | --- |
| **1. Newsletter Engine** | Daily Christos-ethic essays on current events, auto-generated from news feeds and curated through the Founders Vision template | Sequenced daily emails to growing subscriber base; essays archived on renaissance-ministries.com |
| **2. Cell Structure** | 150-person cells containing multiple fellowship groups (5–12 people each). Open Zoom access. Weekly discussions. | Transcribed discussions; flagged topics; communal discernment; human connection |
| **3. Position Paper Pipeline** | Groups discuss issues → Claude generates position papers from transcripts → groups refine over weeks → publish when mature | Curated, group-approved position papers on specific issues; growing repository of applied biblical wisdom |
| **4. Citizen Voting Database** | Verified citizens register named positions on specific issues. Aggregated into temperature maps. Ongoing, not periodic. | A permanent, transparent record of where real citizens actually stand — granular, not binary |
| **5. Christos Ethic Engine** | The AI filter. Scripture is the fixed anchor. Every output measured against biblical standards, then compared to party platforms, secular philosophy, other worldviews. | Ensures all content reflects the Christos ethic; prevents drift into partisan chaplaincy |

The foundational conviction, from the Kingdom Citizen essay:
> *"Every citizen informed, every citizen voting, every citizen contributing their argument to the ongoing conversation about how we shall live together."*

---

## 2. Subsystem 1: The Daily Newsletter Engine

### 2.1 Content Generation Pipeline

Claude takes current news and generates Christos-ethic essays using a curated template called the **Founders Vision** — a growing corpus of Thomas's theological, political, and philosophical positions that serves as the AI's filter for all content generation.

1. **News ingestion:** Subscribe to a raw news feed (Reuters API, or scrape headlines from NYT, Post, Epoch Times, etc.). Each story becomes input.
2. **Essay generation:** Claude reads each story and generates a Christos-perspective essay using the Founders Vision template. The template ensures consistency: biblical grounding, constitutional principles, practical application, discussion questions.
3. **Quality review:** Initially Thomas reviews each essay. Over time, the template becomes sufficiently trained that minimal review is needed. Eventually, an editor role handles this.
4. **Publication:** Approved essays are pushed to GitHub, auto-posted to renaissance-ministries.com, and queued for email distribution.

### 2.2 Email Distribution System

Built on Amazon SES (Simple Email Service) — free for small volumes, scalable as the list grows. Isak has the infrastructure nearly complete.
> **Key Design: Sequenced + Current**
> Every subscriber receives **TWO emails per day:**
>
> 1. **Their next essay in sequence** — starting from Essay #1, advancing one per day. A subscriber who joins in Month 6 starts at Essay #1, not Essay #180. This ensures everyone gets the full foundation.
> 2. **Today's current essay** — the Christos perspective on today's news. This keeps everyone current regardless of where they are in the sequence.

### 2.3 Mailing List Management

- **Master subscriber list:** Single list from which all emails are sent. Never mail from a raw purchased list directly.
- **Purchased list integration:** When a new mailing list is purchased, Claude compares it against the master list and the opt-out list. Only non-duplicate, non-opted-out addresses are added.
- **Opt-out list:** Permanent. Anyone who unsubscribes is never contacted again, even if their address appears on a future purchased list.
- **Per-subscriber tracking:** Each subscriber record stores: email, date joined, current position in sequence, opt-in/opt-out status.
- **Substack parallel:** Consider publishing simultaneously on Substack for discoverability and organic growth. Substack handles its own subscriptions; the master list handles direct email.

---

## 3. Subsystem 2: The 150-Person Cell Structure

### 3.1 The Dunbar Number

Malcolm Gladwell (drawing from Robin Dunbar's research) established that ~150 is the maximum number of people with whom a person can maintain stable social relationships. This is the **natural size of a community** — large enough for diversity of thought, small enough for accountability and trust.

### 3.2 Cell Organization

- **Each cell:** ~150 members. Contains multiple fellowship groups of 5–12 people.
- **Fellowship groups:** Meet weekly via Zoom. Discuss the weekly suggested essay (from the newsletter) or any topic a member brings. Format similar to the current Sunday fellowship.
- **Open access within the cell:** Any member can attend any fellowship group's Zoom session. If a group is especially good, it naturally attracts more participants. Groups that aren't engaging naturally shrink. This is self-regulating.
- **Silent attendance:** If a group is full, additional attendees can join on mute/listen-only. They benefit from the discussion without disrupting it.
- **Discussion transcription:** All Zoom sessions are recorded and transcribed. Transcripts are fed into Claude for position paper generation.

### 3.3 The "Everybody Runs for President" Principle

From the Kingdom Citizen essay: every person should articulate their platform — what they stand for, how they believe things should be done, what their vote means. This is not literally running for office. It is the discipline of **knowing what you believe and being willing to say it with your name attached**. The cell structure provides the safe space to practice this before taking it public.

---

## 4. Subsystem 3: The Position Paper Pipeline

This is the crystallization process — turning conversation into published, named positions.

### 4.1 The Pipeline

1. **Topic emerges** from newsletter, news event, or group member's interest
2. **Fellowship group discusses** the topic. Session is transcribed.
3. **Claude generates a draft position paper** from the transcript, structured as: biblical grounding, constitutional analysis, practical implications, proposed action, counterarguments addressed
4. **Group reviews draft** the following week. Members add points, correct errors, challenge assumptions.
5. **Claude revises** based on new transcript. Cycle repeats until the group approves.
6. **Approved paper is published** to renaissance-ministries.com under that group's name
7. **Other groups access it,** discuss it, generate their own papers on the same topic
8. **Claude synthesizes** all group papers on a topic into a master synthesis
9. **Master synthesis evolves** as more groups contribute, creating an ever-deepening, community-refined position

### 4.2 Repository Structure

On GitHub (or eventually a dedicated database), organized by topic:

```
position-papers/
├── birthright-citizenship/
│   ├── group-1-paper.md
│   ├── group-2-paper.md
│   └── synthesis-v3.md
├── election-integrity/
│   ├── group-1-paper.md
│   └── synthesis-v1.md
├── medical-freedom/
│   └── synthesis-v1.md
└── economic-stewardship/
    └── group-1-paper.md
```

Each paper includes: author group, date, number of contributing members, version history, and the biblical/constitutional citations used.

### 4.3 The Named Stand

From the Kingdom Citizen essay:
> *"The person who refuses to endure the small martyrdoms will eventually face the large ones."*

Every position paper carries the names of the people who approved it. This is the price of participation. You put your name on what you believe. The security is in numbers — as Benjamin Franklin said, "We must all hang together, or most assuredly we shall all hang separately."

---

## 5. Subsystem 4: The Citizen Voting Database

### 5.1 What It Is

An ongoing, granular, named record of where verified citizens stand on specific issues. Unlike elections (binary, periodic, anonymous), the Voting Network is **continuous, granular, and transparent**.

### 5.2 How It Works

1. **Citizen registers** with verified identity (name, address, proof of citizenship)
2. **Citizen reads a position paper or essay** and registers their position (sliding scale, not binary)
3. **Position is recorded permanently** with the citizen's name attached
4. **Aggregate data is published** as temperature maps showing community-wide positions
5. **Citizens can update positions** over time; history is preserved showing evolution

### 5.3 What It Produces

- **Individual clarity:** You can see exactly where you stand on every issue you've engaged with, how your positions compare to Scripture, party platforms, and other standards
- **Community temperature:** Aggregate view of where the community stands — areas of strong consensus, areas of disagreement, shifts over time
- **Political leverage:** A database of 10,000 verified citizens with named positions on specific issues is more powerful than a petition. It can be presented to legislators: "These are real, verified citizens in your district. Here is exactly where they stand."
- **Training data:** The collective reasoning — positions plus arguments — becomes a curated corpus for refining the Christos AI over time

### 5.4 Accountability Features

From the Kingdom Citizen discussion:

- **Congressman scorecard:** Compare your representative's voting record against the community's positions. Not "Republican vs. Democrat" but "Your congressman voted X on Issue Y. Here's where 8,347 verified citizens in the district stand on that same issue."
- **Corporate positions:** Companies, agencies, and organizations can register institutional positions. These are compared against the citizen aggregate.
- **Candidate evaluation:** Political candidates' stated positions and voting records are compared against the Christos ethic and the community aggregate.

---

## 6. Subsystem 5: The Christos Ethic Engine

### 6.1 The Fixed Standard

From the Voting Network v1 specification:
> *"The Word of God is the fixed standard. All other reference points are comparison points — not alternative authorities."*

This principle governs everything the AI produces.

### 6.2 The Founders Vision Corpus

The AI's filter is a growing body of curated content called the **Founders Vision** — analogous to the boot-up.md and operating system documents Thomas built for the CPP physics project. It contains:

- Thomas's theological and political positions (extracted from transcripts, essays, and commentary)
- Biblical principles organized by topic (justice, governance, economics, family, etc.)
- Constitutional principles and original-intent analysis
- The Christos confrontation model: Rapport → Confrontation → Change
- The Kingdom Citizen framework: Know the law → Judge the law → Obey or disobey → Bear the cost → Mobilize action

### 6.3 Multi-Standard Comparison

Every output — newsletter essay, position paper, voter alignment report — shows alignment with multiple standards:

| Standard | Role | Purpose |
| --- | --- | --- |
| Holy Scripture | Fixed anchor (primary) | What does God say? |
| US Constitution (original intent) | Legal framework | What does the law actually say? |
| Republican Platform | Comparison | Where does your position align/diverge? |
| Democratic Platform | Comparison | Where does your position align/diverge? |
| Secular Humanism | Diagnostic | Have secular assumptions crept into your reasoning? |
| Founders Vision | Ministry standard | Alignment with Renaissance Ministries' interpretation |

---

## 7. How the Five Subsystems Connect

The subsystems are not independent — they form a cycle:

```
NEWS → Newsletter Engine generates Christos essays
  ↓
ESSAYS → Distributed to subscribers; posted to website
  ↓
CELLS → Fellowship groups discuss essays; sessions transcribed
  ↓
POSITION PAPERS → Claude generates from transcripts; groups refine; publish when ready
  ↓
VOTING DATABASE → Citizens register named positions on published papers
  ↓
ETHIC ENGINE → All outputs filtered through Christos standard; comparison with Scripture and platforms
  ↓
FEEDBACK → Aggregate positions inform next essays; cycle repeats
```

The output of each subsystem is the input of the next. The cycle accelerates as more people participate. **One informed person influences a fellowship group. One fellowship group generates a position paper. One position paper draws votes from the community. The aggregate positions create political leverage. The leverage creates change. The change generates new topics for the newsletter. The cycle repeats.**

---

## 8. Technical Architecture

| Component | Technology |
| --- | --- |
| Essay generation | Claude API with Founders Vision system prompt. News feed as input. Output: markdown essays. |
| Email distribution | Amazon SES (Isak has infrastructure nearly complete). Per-subscriber sequence tracking in PostgreSQL. |
| Content storage | GitHub repository (essays, position papers, Founders Vision corpus). Auto-posts to renaissance-ministries.com. |
| Discussion transcription | Zoom recording → Otter.ai or ClickUp AI Notetaker → transcript → Claude for position paper generation |
| Position paper generation | Claude API. Input: discussion transcript + Founders Vision template + prior papers on same topic. Output: structured position paper. |
| Voting database | PostgreSQL with pgvector for semantic search across positions. User authentication with identity verification. |
| Multi-standard comparison | Reference texts (Bible, platforms, etc.) chunked and embedded in pgvector. Alignment calculated programmatically, not by AI judgment. |
| Website | renaissance-ministries.com (WordPress for now; migrate to custom as scale demands). Subdomains for Voting Network. |
| Project management | ClickUp (shared with Hyperphysics and Idiomotion). Isak manages. |

---

## 9. Implementation Phases

| Phase | Deliverables |
| --- | --- |
| **Phase 1: NEWSLETTER** (Now – May 2026) | Complete Amazon SES setup. Begin generating daily Christos essays from news feeds. Thomas reviews initially. Build initial subscriber list from fellowship + purchased lists. Implement sequenced + current dual-email system. Post all essays to renaissance-ministries.com. |
| **Phase 2: CELLS** (June – August 2026) | Formalize the Sunday fellowship as Cell #1. Recruit 2–3 additional fellowship groups within Cell #1 (friends of current members). Begin transcribing all Zoom sessions. Start generating position papers from transcripts. Publish first 3–5 position papers. |
| **Phase 3: VOTING** (September – December 2026) | Build the citizen registration system (identity verification). Enable position-taking on published papers. Implement temperature maps for aggregate views. Open to subscribers beyond Cell #1. Target: 100 registered citizens. |
| **Phase 4: SCALE** (2027) | Multiple cells operating. Cross-cell synthesis of position papers. Congressman scorecard feature. Candidate evaluation. Substack parallel publication. Target: 1,000 registered citizens. Explore connection with similar movements (Restore Britain, etc.). |

---

## 10. The Boot-Up Analogy: From CPP to Christos

Thomas built an "operating system" for the CPP physics project — a `boot-up.md` file that tells a new Claude conversation everything it needs to know: nomenclature, formatting conventions, failure modes, glossary, open problems, the current state of the theory. Every new conversation starts with "Access boot-up.md" and Claude is instantly oriented.
The Christos Voting Network needs the same thing. The **Founders Vision corpus** is the equivalent of `boot-up.md` for political and moral content. It tells Claude:

- These are our theological positions (with citations)
- These are our constitutional interpretations (with case law)
- These are our political principles (with reasoning)
- This is how we write essays (tone, structure, citation standards)
- This is how we evaluate issues (the Kingdom Citizen framework)
- These are our boundaries (prophets not chaplains; Scripture over party; named stands)

Every essay, every position paper, every voter alignment report is generated through this filter. The filter grows as Thomas adds commentary, as fellowship discussions generate new insights, and as position papers crystallize community wisdom. Over time, the Founders Vision corpus becomes a **comprehensive, searchable, AI-accessible body of applied biblical wisdom** — the Kingdom Wisdom Database that feeds both the Voting Network and the broader Christos AI ecosystem.

---

## 11. The Kingdom Advance

From the Kingdom Citizen essay:
> *"This is how the Kingdom advances in the political realm. Not by theocracy — we do not seek to impose Christianity by law. But by participation — Christians engaging as citizens, bringing their values to the public square, persuading their neighbors, shaping public opinion."*

The Voting Network is the infrastructure for that participation. It takes the vision that began in a 1986 EST seminar, survived a failed presidential campaign, waited 38 years for the technology to catch up, and now has every piece in place: AI for content generation, Zoom for fellowship, GitHub for storage, email for distribution, and a community willing to put their names on what they believe.
> *Your Kingdom come, Your will be done, on earth as it is in heaven.*

---

## 12. The Christos Cycle — Summary

### The Five Duties of the Kingdom Citizen

From the Kingdom Citizen essay, every citizen must:

1. **Know the law** — both man's law and God's law
2. **Judge the law** — assess whether human law conforms to moral law
3. **Obey or disobey** — comply with righteous law and resist unrighteous law
4. **Bear the cost** — accept the consequences of principled disobedience
5. **Mobilize action** — work for the reform of unjust systems

### The Five Subsystems That Enable These Duties

| Duty | Subsystem |
| --- | --- |
| Know the law | Newsletter Engine (daily education) |
| Judge the law | Christos Ethic Engine (multi-standard comparison) |
| Obey or disobey | Cell Structure (communal discernment) |
| Bear the cost | Citizen Voting Database (named stands) |
| Mobilize action | Position Paper Pipeline (crystallized, published positions) |

### The Multiplication Effect

> *"One informed person influences a fellowship group. One fellowship group generates a position paper. One position paper draws votes from the community. The aggregate positions create political leverage. The leverage creates change."*

This is how the Kingdom advances — not by political coercion, but by persuasion, one mind at a time, one heart at a time, one conversation at a time.

---

## Key Scriptures

> *"We ought to obey God rather than men."* — Acts 5:29

> *"When the righteous are in authority, the people rejoice: but when the wicked beareth rule, the people mourn."* — Proverbs 29:2

> *"Righteousness exalteth a nation: but sin is a reproach to any people."* — Proverbs 14:34

> *"He made from one man every nation of mankind to live on all the face of the earth, having determined allotted periods and the boundaries of their dwelling place."* — Acts 17:26

> *"If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land."* — 2 Chronicles 7:14

---

*Prepared by Claude (Anthropic) at the request of Thomas Lee Abshier, ND, synthesizing: (1) transcript of Thomas-Isak conversation on Voting Network v2, April 2026; (2) "The Kingdom Citizen" fellowship essay, April 4, 2026; (3) Christos Voting Network Technical Specification v1.0, February 2026.*
*This is the condensed edition. An expanded version with full boot-up procedures, data flow diagrams, and GitHub repository structure will follow.*

---

**Renaissance Ministries** | www.renaissance-ministries.com **Hyperphysics Institute** | www.hyperphysics.com
