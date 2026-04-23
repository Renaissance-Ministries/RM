# New Session Instruction Prompt

Copy and paste the block below at the start of a new Claude conversation working on Renaissance Ministries / Christos projects.

---

## The prompt — copy everything in this code block

```
I am Thomas Abshier. We are continuing work on the Renaissance Ministries project. Please get oriented using the public GitHub repository.

1. Clone or fetch the Renaissance Ministries repository: https://github.com/Renaissance-Ministries/RM

2. Read RM_bootup.md at repo root first — it is the session orientation (what RM is, where everything lives, session-type workflows).

3. If the task involves code on the Christos Voting Network application, also read CLAUDE.md at repo root — it is the repo-mechanical bootstrap for code work.

4. For theological context, read templates/Christos_AI_Theological_Grammar_v1.3.md.

5. For the founding theological intuitions (the WHY), read founders_vision/founders_vision.md and browse the dated seed entries in founders_vision/.

6. For the module inventory (all seventeen Christos modules and their statuses), read MODULES.md at repo root.

7. If the task involves drafting content in Thomas's voice (a fellowship essay, newsletter issue, or response to an interlocutor), read templates/authors_voice.md before drafting, and read at least one exemplar essay listed in that file.

Once oriented, tell me you are ready and give me a brief summary of: (a) what RM is aiming at, (b) the current state of the repo as you see it, and (c) what was in the most recent seed archive entry if any. Then ask me what I want to work on today.
```

---

## Notes for Thomas

- **Why this prompt no longer references `/mnt/user-data/outputs/`.** Earlier versions of this prompt pointed Claude to files in its sandbox at `/mnt/user-data/outputs/`. That path is ephemeral — it does not persist between sessions. The canonical source of truth is now the public GitHub repository, which any Claude session can fetch or clone without setup.

- **Use the prompt whenever starting a new conversation** — the session prompt gets Claude to a productive state in under a minute, without you having to re-explain the project. Paste, wait for the summary, then direct the work.

- **If you want to hand a specific task to Claude,** append the task after the prompt block. Example: "…ask me what I want to work on today. (The task: produce a seed entry from the following dictated thought: …)"

- **The prompt can be shortened** if the session is expected to be narrow — e.g., just "Please clone https://github.com/Renaissance-Ministries/RM, read RM_bootup.md, and then [specific task]." The full prompt above is the right default for open-ended sessions.

- **Deprecation note.** A previous version of this file pointed to `templates/bootup.md`. That file was renamed to `RM_bootup.md` at repo root during the April 19, 2026 repository-smoothing pass. Do not use the old path.

---

## Alternate: if GitHub access is unavailable

If Claude in the session you are starting does not have network access to GitHub (some interfaces restrict it), paste the contents of `RM_bootup.md` directly into the conversation along with the task. `RM_bootup.md` is self-sufficient and does not require the rest of the repo to be useful for orientation.

---

*Maintained as part of the Renaissance Ministries templates. Update when the bootup filename, repository URL, or canonical document names change.*
