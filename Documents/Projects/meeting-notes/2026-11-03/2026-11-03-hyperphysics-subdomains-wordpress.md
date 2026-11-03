# Hyperphysics Subdomains and WordPress Setup
**Date:** 2026-11-03
**Participants:** Isak Gutierrez, Thomas Abshier

---

## Clean Transcript

**Thomas:** I thought of something last night about the websites. On Theory of Absolutes, they have a plugin that tells you how many visits to each page and post. I think we should put that in as a plugin for all our sites.

**Isak:** Let's do it. Do you have the name of the plugin?

**Thomas:** You can look at it on Theory of Absolutes — it's already up.

**Isak:** Got it. I see Monster Insights — total users, sessions.

**Thomas:** And I thought of a way of doing the schooling. We do history.hyperphysics.com, science.hyperphysics.com, economics.hyperphysics.com — just make a dozen or 50, however many different subjects there are. Every subject has its own subdomain.

**Isak:** So we don't need "institute.hyperphysics" necessarily. It's just each subject matter as it comes up.

**Thomas:** Right. Did you already talk to Steve about doing that?

**Isak:** I didn't get to that part yesterday.

**Thomas:** Let's hold off on Dr. Philosopher. Let's just do philosophy.hyperphysics.com. I'll redirect Dr. Philosopher to that site.

**Isak:** Sure. Each of these can have like science.hyperphysics.com, etc.

**Thomas:** Let's just do philosophy for right now. And economics. Economics, history, and philosophy.

**Isak:** Economics, history, philosophy.

**Thomas:** And it probably wouldn't be bad to do medicine.

**Thomas:** We can just have a whole school of them. I run into a lot of economics things and history things. Another one might be literature.

**Thomas:** And mathematics.

**Thomas:** Those are just the school ones. Then we'll start thinking about Theory of Absolutes subdomains too — maybe tomorrow.

**Isak:** We're probably not gonna need WordPress on these, unless — do you want WordPress?

**Thomas:** Actually, that's the only point of having them right now — having WordPress on them. It doesn't need to be anything other than a site I can log on to and put essays on. They're not going to be going to the home page other than to say an outline of the whole thing. Maybe Steve can just clone MyCounselor a dozen times.

**Isak:** MyCounselor has... it's Divi 5.13.

**Thomas:** So we don't want to put Divi on any of these. Just straight WordPress. Divi adds a layer of complexity that makes it hard for people to work on.

**Isak:** Copy. Claude says: if we have Divi, don't turn it off — deactivating it will break the site. The bypass is a small plugin that intercepts the front page before Divi ever sees it.

**Thomas:** The issue is rewriting the MyCounselor site so we're bypassing Divi, just making it a WordPress site.

**Isak:** Yes. So it'll still have WordPress that you can use.

**Thomas:** Don't make it a Divi site. Do you need Steve to load WordPress, or can you load it?

**Isak:** He'll have to load WordPress — they use cPanel, they have access I don't have. That's customary for web design companies.

**Thomas:** Okay, so we're letting them do the hosting and cPanel back-end stuff. Just put on WordPress — most economical way possible. If we have them load WordPress, are you able to do everything on WordPress through Claude?

**Isak:** Yes. I can have Claude write a version of the front page that bypasses their format — it'll be HTML, so it'll kind of bypass their front page. It'll be designed with a search bar, menu bar, and all the style that goes with the other articles and pages you add.

**Thomas:** Use WordPress and use HTML inside of WordPress. Don't make it a Divi site.

**Isak:** Copy. Just sent that request to Steve.

*(Later)*

**Thomas:** Steve did set up the blog subdomains on all those five subdomains, and it was $375 — around $75, about an hour apiece.

**Isak:** He'll probably send you a message with the bill for today's ones.

**Thomas:** He said to hold off on payment — just got a message from you to hold off on sending them payment for that.

---

## Summary

- **New hyperphysics subdomains requested:** Six subject-based subdomains for the Christos Home School project:
  - economics.hyperphysics.com
  - history.hyperphysics.com
  - philosophy.hyperphysics.com (replaces the "Dr. Philosopher" domain — Thomas will redirect)
  - medicine.hyperphysics.com
  - literature.hyperphysics.com
  - mathematics.hyperphysics.com
- **WordPress only, no Divi** — Thomas wants plain WordPress so he can log in and post essays. No Divi theme.
- **Front page design:** Isak/Claude will build a custom HTML front page for each subdomain (search bar, menu, styled to match article pages), injected into WordPress.
- **MyCounselor.com** needs the same treatment — currently Divi, needs a proper front/intro page. Don't deactivate Divi (breaks the site); use a bypass plugin instead.
- **Steve already completed** the five previously requested blog subdomains at $375 ($75/each). Today's six new ones sent to Steve; payment on hold pending final invoice.
- **Theory of Absolutes subdomains** (mathematics.theoryofabsolutes.com, biology.theoryofabsolutes.com, etc.) discussed as a future tranche — deferred to another day.

---

## Action Items

| # | Owner | Item | Status |
|---|-------|------|--------|
| 1 | Steve | Set up 6 new hyperphysics subdomains with WordPress (no Divi): economics, history, philosophy, medicine, literature, mathematics | Requested |
| 2 | Isak | Build custom HTML front pages for each new subdomain (search bar, menu, article-matching style) | Open |
| 3 | Isak | Build intro/front page for MyCounselor.com (bypass Divi, don't deactivate it) | Open |
| 4 | Thomas | Redirect Dr. Philosopher domain to philosophy.hyperphysics.com | Open |
| 5 | Thomas | Plan Theory of Absolutes subdomain tranche (future session) | Open |
| 6 | Thomas | Hold payment to Steve pending combined invoice for previous 5 + new 6 subdomains | Open |
