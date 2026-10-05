---
title: "YAML Frontmatter Improvements — Multi-Granularity Keywords for AI Training"
date: 2026-10-05
participants: [Thomas Abshier, Isak G]
module: CFE
topics: [christos_framework, wisdom_database, technology]
status: current
type: transcript
---

# YAML Frontmatter Improvements — Multi-Granularity Keywords for AI Training

**Date:** October 5, 2026
**Participants:** Thomas Abshier, Isak G

---

## Clean Transcript

**Thomas:** I sent you the note — Claude went through and analyzed the work that Claude Code did on YAML, and it found a number of things that were not complete, missed, or duplicated. I thought, well, Claude found it, maybe I should just tell Claude to fix it.

**Isak:** Yeah, do it. Even just what you said, Claude will be able to take that and go, okay. There were a couple things I noticed — like there maybe wasn't enough categorization, or it could have a lot more keywords. Almost like the full article of keywords. There's a great deal of sorting that can happen beyond the few categorizations I put in. I can run it and have it update — add more.

**Thomas:** What I would recommend, and what I thought was going to be done, was simply having all of the keywords that Claude went through and thought were keywords. Just have an entire list of keywords.

**Isak:** Yeah, it was a very small list. It just went from the big ones. There's an extension of keywords we can definitely add — more of a subgroup. It'll allow them to cohesively go "this is actually related to that." Not just "these are in one section." There would be more crossover and more navigability.

**Thomas:** Probably having large categories of topics and then keywords that are more granular. I think we need both. Maybe big picture, medium picture, and small picture as frontmatter types of YAML formatting.

**Isak:** Big picture like the categories, mid picture...

**Thomas:** "What is this — economics? Physics?" That'd be super big. Then topics within — like politics: mothers killing children, tax policies, lesbian rights. There's thousands, maybe millions of different topics. Every event has its own topic, but it fits into a larger category. Maybe three levels is even too small. You've got economics, then the Fed interest rates, then effect on inflation, effect on the business cycle, how it affected demand in a market sector, how a particular company deals with market sector demand, how people respond to new products. There's many different layers.

Every topic could have many different ways of organizing or stratifying it. If you're trying to write an article, being able to pull up all of the relevant data on that topic — by having multi-gradient categorization, I think we're going to create a much better trained AI. When you do a trained AI, it takes what you brought to it, all the data, and puts it into its own database that answers questions based on what it learned. I think a lot of how it trains itself is based on how you have categorized what you've given it.

**Isak:** Yeah. Probably what I should do is run this again and say: "This is what we're making, include this transcript, and develop it in a way that you would train another LLM for. Write the frontmatter in a way that AI would best be able to access it."

**Thomas:** There you go. That's it. Basically asking it what it needs to create a good trained database, a trained AI, and let it be ready.

**Isak:** Because that'll probably make it more useful for searching.

**Thomas:** Also knowing the purpose — you can send a note to Joelle. What we're trying to create is a database that allows a chief executive, a commander-in-chief, to be able to say, "We just got this news report in — how would the Christian Nation paradigm handle this?" I've called it various things. The Righteous Society was my first name. A friend wrote a book called The Moral Society. The Christian Nation was another name.

What we're trying to create is an AI that allows the commander-in-chief to get a situation analysis through this paradigm for any issue that arises.

---

## Summary

Thomas reviewed the YAML frontmatter work Isak did (via a separate Claude session) and found it had missed items and lacked granularity. Both agreed the topic taxonomy needs to be expanded from the current ~100 terms to a multi-level hierarchy:

- **Level 1 (Super-categories):** Economics, Physics, Politics, Theology, etc.
- **Level 2 (Topics):** Fed interest rates, tax policy, gender issues, atonement, etc.
- **Level 3 (Granular keywords):** Specific events, people, arguments, scripture references

The purpose is twofold:
1. **For Thomas's writing:** pull up all relevant prior work on any topic
2. **For AI training:** build a trained model that can respond to any policy question through the "Christian Nation / Righteous Society" paradigm — essentially a chief-executive advisor AI

Isak's approach: re-run the frontmatter injection asking Claude to generate keywords optimized for LLM training, not just human browsing.

---

## Action Items

- [ ] **Re-run frontmatter generation** with expanded keyword granularity — ask Claude what it needs for optimal RAG/training retrieval (Isak)
- [ ] **Add multi-level topic hierarchy** — super-category, topic, granular keywords (Isak)
- [ ] **Thomas to re-send** the Claude analysis that found gaps/duplicates (shared link didn't work for Isak)
- [ ] **Send Joelle** the purpose statement: building a presidential-advisor AI database
