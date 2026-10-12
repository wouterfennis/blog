---
name: handoff
description: "Summarise the current session into a compact handoff note so the author can run /clear and continue in a fresh, cheap context."
argument-hint: "Optional focus for the next session"
disable-model-invocation: true
allowed-tools: Bash(git status*), Bash(git diff --stat*)
---

The author wants to clear the context to save tokens and continue later. Next focus (if any): $ARGUMENTS

Run `git status --short` and `git diff --stat` once, then reply with a handoff note of at most 15 lines, in this format, and nothing else:

```text
Goal: <one line>
Done: <bullets: files changed and what, by path>
Decisions: <bullets: choices made and why, only non-obvious ones>
Open: <bullets: unfinished work, failing lint, questions for the author>
Next: <the first concrete step>
```

Rules:

- Do not create a file and do not paste diffs or file contents.
- Leave out anything recoverable from the git diff or from `CLAUDE.md`.
- End with one line: "Copy the note, run `/clear`, then paste it as your first message."
