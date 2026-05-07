# Patch Generation and Commit Flow — Renaissance Ministries

**Location:** `templates/RM_patch_flow.md`
**Purpose:** Canonical reference for Claude sessions producing repo-bound deliverables for the RM repository. Defines the patch-based commit flow that became the RM default on May 7, 2026, harmonizing RM's workflow with the parallel CPP repository's battle-tested protocol.
**Pair this with:** `RM_bootup.md` §3.5 (the in-bootup overview), `RM_bootup.md` §3 (legacy import-script pattern for cases where it still fits — fellowship-essay HTML regeneration, multi-step file orchestration), and CPP `bootup.md` §3 (the parent protocol; this file imports from there).
**Status:** v1.0. May 7, 2026.

---

## 1. When to read this file

If you are a Claude session about to produce repo-bound deliverables for RM — fellowship essays, founders_vision seed entries, charters, operating-system documents, MODULES.md edits, bootup amendments, template additions — read this file in full **before generating any patch**. Do not reconstruct the apply macro from `conversation_search` or chat history. The canonical form below is documented precisely so it does not have to be reinvented every session.

If your deliverable is a substantive file change, the default is patch-based. If your deliverable is an old-style multi-step import (e.g., fellowship essay where `templates/md_to_wp_html.py` regenerates WordPress HTML from the canonical markdown), see §9 for when the import-script fallback is the better fit.

---

## 2. Where Thomas works locally

When Claude generates files or edits during a session, Thomas commits them from his local clone — NOT from the Claude container. The in-container clone is ephemeral; Thomas's local clone is the source of truth that gets pushed to GitHub.

**Standard local path (Thomas's machine, Git Bash on Windows):**

```
~/Documents/GitHub/RM
```

(Mirroring the CPP convention; the same parent `~/Documents/GitHub/` directory holds both repos.)

**Standard in-container path (Claude's working clone):**

```
/home/claude/RM
```

The in-container clone is where Claude makes commits and runs `git format-patch`. Claude does NOT push from the in-container clone; the container has no credentials for `origin`. All pushes happen from Thomas's local clone after `git am`.

---

## 3. The patch-based protocol — overview

1. **Claude clones (or pulls) the repo** in the container working directory.
2. **Claude makes the substantive changes** in `/home/claude/RM` — creates new files, edits existing files, etc.
3. **Claude commits each logical change as a separate commit** in the in-container clone, authored as `Opus <opus@rm.local>` (see §8).
4. **Claude generates `.patch` files** via `git format-patch HEAD~N..HEAD`, where N is the number of new commits.
5. **Claude renames the patches** to match the repo's sequential numbering (see §6) and places them under `/mnt/user-data/outputs/patches/`.
6. **Claude surfaces the patches** via the `present_files` tool so they appear in Thomas's download menu.
7. **Claude provides the apply macro** (chained-`&&` form, §4) at the top of the response.
8. **Thomas downloads** the patches to `~/Downloads/`, runs the apply macro, confirms success.
9. **Claude syncs the in-container clone** after Thomas confirms (`git fetch origin main && git reset --hard origin/main`).

Patches that exist in `/mnt/user-data/outputs/patches/` but are *not* surfaced via `present_files` are invisible to Thomas. Both steps are required.

---

## 4. The canonical apply macro — chained-with-fail-fast

For multi-patch sessions (typical case — most batches produce 2–5 patches), use the chained-`&&` form so a failed `git am` aborts the chain before pushing partial state:

```bash
cd ~/Documents/GitHub/RM && git pull origin main && \
  git am ~/Downloads/0NNN-first-patch.patch && \
  git am ~/Downloads/0NNN-second-patch.patch && \
  git am ~/Downloads/0NNN-third-patch.patch && \
  git push origin main
```

Four pieces in order:

1. **`cd ~/Documents/GitHub/RM`** — switch to Thomas's local working clone (must always be the first step).
2. **`git pull origin main`** — cheap insurance; should be a no-op if Claude generated the patches against the current `main` HEAD, but catches the rare race where Thomas pushed unrelated work between Claude's last sync and patch generation.
3. **`git am ~/Downloads/0NNN-*.patch`** — one line per patch, in numerical order. Order matters because later patches may reference content added by earlier patches; out-of-order application causes `git am` to fail with hash-mismatch errors.
4. **`git push origin main`** — only fires if every preceding step succeeded (the `&&` chain short-circuits on the first failure).

If any `git am` fails, the chain stops there. Thomas can run `git am --abort` to revert the failed patch's partial state, then report the failure to Claude for diagnosis. **Do not push partial state under any circumstance.**

---

## 5. Single-patch variant

For a single-patch session (small organizational deliverable, single seed-archive entry, minor README update):

```bash
cd ~/Documents/GitHub/RM && git pull origin main && \
  git am ~/Downloads/0NNN-description.patch && \
  git push origin main
```

The structure is identical to §4; the chain is shorter.

---

## 6. Patch numbering convention

Patches are numbered sequentially across all sessions; the numbering does not reset. New patches continue from the highest existing patch number in the repo's commit history.

To verify the current highest number, run in the in-container clone:

```bash
git log --oneline | head -20
```

Look for prior `Opus <opus@rm.local>` commits and identify the highest 4-digit prefix in the patches that produced them. (RM's commit messages do not currently embed patch numbers in their commit-message text the way some workflows do; the numbering lives only in the `.patch` filenames Claude generates.)

**As of May 7, 2026 protocol formalization, the highest committed RM patch is 0004** (the four patches from the protocol-formalization batch: CFE essay, IDM module addition, founders_vision seed, this protocol-formalization patch itself).

If a session is uncertain of the current high-water mark — for example, after a long gap or after Thomas has done several manual commits — Claude should run a quick check before assigning numbers. A stale numbering does no real harm (patches still apply correctly; only the audit trail is slightly off), but conflicts with existing patch numbers in `~/Downloads/` can cause `git am` confusion.

---

## 7. Generating patch files in the container

After committing locally in `/home/claude/RM`:

```bash
git format-patch -N HEAD~N..HEAD -o /tmp/p_outdir/
```

Where `N` is the number of new commits to package. `git format-patch` emits files named `0001-first-commit-subject.patch`, `0002-second-commit-subject.patch`, etc., based on its own internal numbering — these are NOT the canonical RM patch numbers.

Then:

1. **Rename each file** from `git format-patch`'s default `0001-`, `0002-`, ... numbering to the global RM sequence (e.g., `0042-`, `0043-`, ...).
2. **Move them** to `/mnt/user-data/outputs/patches/` (create the `patches/` subdirectory if needed).
3. **Surface them** via the `present_files` tool so they appear in Thomas's download menu.

The renaming step is mechanical: `mv 0001-foo.patch 0042-foo.patch && mv 0002-bar.patch 0043-bar.patch && ...`. The patch contents themselves are not modified.

---

## 8. Author convention

Claude's commits in the in-container RM clone are authored as `Opus <opus@rm.local>`:

```bash
git config user.name "Opus"
git config user.email "opus@rm.local"
```

Set these once per fresh in-container clone. They keep Claude-authored commits visually distinct from Thomas's own commits in `git log` and in the GitHub web UI. The CPP analog uses `opus@cpp.local`; RM uses `opus@rm.local` to keep the two repos' attributions distinguishable when both are visible (e.g., on Thomas's own machine across both clones).

The CPP convention (`bootup.md` §3) of inline `GIT_AUTHOR_NAME=...` per-commit is also valid; the per-clone `git config` form above is simpler and equally robust as long as the clone is dedicated to Claude sessions.

---

## 9. When the patch flow is NOT appropriate

The patch flow handles file additions, file edits, file moves, and file deletions cleanly. It is the right default for nearly every Claude-generated repo change in RM.

The patch flow is **not** the right fit when the deliverable involves orchestrated multi-step processing that legitimately belongs in a script:

- **Fellowship-essay imports** that regenerate WP-paste HTML from canonical markdown via `templates/md_to_wp_html.py`. The HTML can be pre-generated by Claude in the container and included in the patch — and that is now the recommended path (it preserves the repo's invariant that `.md` and `.html` are always in sync and avoids requiring Thomas to run a regen step). But for sessions where the regeneration logic is complex enough that bundling it into a script aids clarity, the legacy `import_<topic_slug>.sh` pattern (RM_bootup.md §3) remains valid.
- **Multi-file structural reorganizations** that involve renames + content edits + index updates as a single atomic operation. `git mv` followed by content edits handles most of these in patch form, but in edge cases an apply-script can be clearer.
- **Operations that depend on the local environment** (running tests, regenerating computed indexes, calling out to external tools). These are uncommon in RM but possible.

When in doubt, default to patches. Reach for the import-script fallback only when patches would actively obscure what is happening.

**For the canonical fellowship-essay flow specifically:** Claude generates the `.md`, runs `templates/md_to_wp_html.py` in the container to produce the `.html`, commits both, and ships them in a single patch. The recipient does not need to regenerate; the patch carries both files in their final form. This is the v1.0 recommended approach as of May 7, 2026.

---

## 10. After Thomas confirms a successful push

Sync the in-container clone before continuing work in the same session:

```bash
cd /home/claude/RM && git fetch origin main && git reset --hard origin/main
```

This ensures the in-container clone reflects the canonical state on GitHub, including any commits Thomas made manually between Claude's patch generation and Claude's resume.

After the sync, the local `Opus`-authored commits that produced the patches are gone from the in-container working tree (because they're now in `origin/main` under their hashes from Thomas's `git am`, not the original in-container hashes). This is fine and expected.

---

## 11. Failure modes and recovery

| Failure                                          | Diagnosis                                                                  | Recovery                                                                                |
|--------------------------------------------------|----------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| `git am` fails with "patch does not apply"        | Thomas's `main` HEAD has drifted from where Claude generated against; the patch references content that has since changed. | `git am --abort`, report failure to Claude, regenerate patch against current `main`.    |
| `git am` fails with "Untracked working tree files would be overwritten" | A file the patch creates already exists in Thomas's working tree (e.g., from a prior dry-run). | `git am --abort`, remove or move the conflicting file, retry.                          |
| `git push` rejected (non-fast-forward)           | Thomas's `main` has diverged from the patches' base since `git pull` step. | `git pull --rebase origin main`, resolve any conflicts, retry `git push`.                |
| `git push` fails with auth error                  | Local credentials expired or unset.                                        | Re-authenticate (GitHub CLI: `gh auth login`; or update credential helper); retry push. |
| Patches present in `/mnt/user-data/outputs/patches/` but not visible to Thomas | `present_files` tool was not called.                                       | Claude calls `present_files` with the patch paths in the next response.                 |
| Patch numbering collision                         | Two `0NNN-*.patch` files with the same prefix in `~/Downloads/`.           | Rename one; verify Claude is using the correct high-water mark.                         |

In all cases of `git am` failure: **do not push partial state**. The chained-`&&` macro prevents this automatically, but if Thomas runs the steps manually, the discipline must be maintained by hand.

---

## 12. Cross-references

- **`RM_bootup.md` §3.5** — in-bootup overview of this protocol; lighter-weight than this document and the right entry point during session orientation.
- **`RM_bootup.md` §3** — legacy import-script pattern; remains valid for cases described in §9 above.
- **`RM_bootup.md` §4** — dual-export rule for fellowship essays; intersects with §9 above (HTML regeneration).
- **CPP `bootup.md` §3** — the parent protocol; this RM document imports its structure from there.
- **CPP `templates/operating_system.md`** — for sessions that work across both repos, the CPP operating-system document covers patch flow in greater detail than this RM-side equivalent currently does. This RM document will grow as RM-specific failure modes and conventions accumulate.

---

## 13. Maintenance

This file should be updated when:

- The protocol materially changes (e.g., switching from `git am` to a different application mechanism; introducing signed commits; changing the author convention).
- A failure mode is encountered in practice that is not covered in §11; add the row.
- The patch-numbering convention drifts (e.g., a session resets the count by accident); document the resolution.
- New file types or structural patterns warrant explicit treatment in §9 (when patch flow is NOT appropriate).

Keep this file in sync with `RM_bootup.md` §3.5. The bootup is the orientation; this file is the manual.

---

*"Let all things be done decently and in order."* — 1 Corinthians 14:40
