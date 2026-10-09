# YAML Front Matter & Transforming America Article — 2026-10-08

**Tag:** RM / PRES
**Participants:** Thomas, Isak

---

## Summary

Thomas discovered that the "Transforming America by God's Power" article on Renaissance Ministries was missing its V2 YAML front matter. The cause: Thomas had the article open in the WP editor and continued editing after Isak pushed front matter, effectively overwriting it with a version that didn't include the YAML block.

Thomas had tried to save all open articles before editing but missed this one. The article exists on both Renaissance Ministries and Dr. Thomas for President — Thomas wants the canonical version on the President site, but will continue editing on Renaissance (for fellowship/Sunday meeting use) and periodically sync to President.

### Resolution

1. Claude found two WP versions: ID 4573 (older) and ID 4587 (modified today, actively edited, no front matter)
2. Merged V2 front matter (author, module, domains, topics, 20 scripture references, mentions, thesis, source, WP ID, WP slug) into the current version
3. Converted to markdown and pushed to the President repo (which was made public to allow Claude access)
4. The President repo previously only had a 2023 version with a similar title — this is a new/separate article

### Prevention Protocol Agreed

- Isak will send Thomas an email listing which articles had front matter added each session
- Thomas will save/close those articles in WP before doing further edits
- Isak will scan all articles to verify no other front matter was lost

## Clean Transcript

**Thomas:** On the Transforming America thing — you went through and did all of the YML front matter on all of the sites. I tried to save everything after you did. I have a bunch of them already open. And I apparently did not save the YML on that one.

**Isak:** I should have checked that. I should have communicated. That was my fault too.

**Thomas:** You noticed I said Transforming America is on Dr. Thomas for President — the one I was editing was on Renaissance.

**Isak:** Oh, is it a double?

**Thomas:** I have a double, so we need to reconcile. I probably should only have one. When you do two, it ends up a disaster. The more appropriate place would be on President.

**Isak:** I'm going to check that it has front matter on Renaissance, then clone it and replace the President version.

**Thomas:** I've been using that link for our fellowship. I think I'll continue to update the Renaissance site, and then just update [President] at intervals. I wanted it on President because I wanted it to be part of the whole template.

**Isak:** The repo is now public, so if you want to give that a go with Claude, it should work.

**Thomas:** Probably a good thing to do would be to make a note of all the ones you did an update on, and just send me a copy of that — even have Claude send an email with which ones had front matter added each day. That gives me a heads up to save each of those first.

## Action Items

- [ ] Isak: Scan all RM and President articles to verify no other front matter was lost
- [ ] Isak: Set up notification email to Thomas listing articles updated with front matter
- [ ] Thomas: Save/close open WP editor tabs before Isak pushes front matter
- [ ] Thomas: Periodically sync Transforming America from Renaissance to President site
