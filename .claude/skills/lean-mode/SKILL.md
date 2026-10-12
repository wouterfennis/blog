---
name: lean-mode
description: "Work token-efficiently for the rest of the session: targeted reads, no re-reading, terse replies, minimal tool output."
argument-hint: "Optional task to perform in lean mode"
disable-model-invocation: true
---

Switch to token-saving behaviour for the rest of this session. Task (if any): $ARGUMENTS

## Rules

- **Search before reading.** Use Grep or Glob to locate the relevant lines, then Read only that range with `offset` and `limit`. Posts in `_posts/` can be long; never read a whole post to change one section.
- **Never re-read.** Do not read a file again after editing it, and do not re-read a file already in context.
- **Batch tool calls.** Run independent reads, greps, and edits in one parallel turn.
- **Prefer Edit over Write** for existing files, so only the changed text is sent.
- **Keep command output small.** Pipe long output through `head`, `tail`, or a filter. Run `npm run lint:md` once at the end, not after every edit.
- **Do not scan all posts** unless the task needs it. For cross-post checks, grep for the specific term and list file names only (`output_mode: files_with_matches`).
- **No subagents** for work you can do in two or three direct tool calls.
- **Terse replies.** State what changed and anything the author must decide, in a few lines. No restating the request, no summaries of diffs the author can see, no option surveys; give one recommendation.
- **Ask once.** If something is ambiguous, pick the sensible default and mention it instead of asking, unless the choice is hard to reverse.

If a task is started, carry it out under these rules. Otherwise reply with a single line confirming lean mode is on.
