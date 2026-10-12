---
name: create-issue
description: Create a GitHub issue for this repository with the gh CLI from a short summary.
argument-hint: "What the issue is about (goal, tasks, verification)"
disable-model-invocation: true
allowed-tools: Read, Write, Bash(gh issue *), Bash(gh label list*)
---

Create a GitHub issue in the current repository for: $ARGUMENTS

## Steps

1. Draft a clear title and a Markdown body with the sections **Goal**, **Tasks** (a `- [ ]` checklist) and **Verification**.
2. Write the body to a file in the scratchpad directory with the Write tool. Always use a body file for multi-line bodies; it avoids shell quoting problems.
3. If labels are wanted, run `gh label list` first. A label that does not exist makes `gh issue create` fail, so omit it or ask before creating one.
4. Run `gh issue create --title "<title>" --body-file <file>` (add `--label`, `--assignee @me` or `--milestone` when requested).
5. Report the issue URL that `gh` prints. For several related issues, create them one by one and note the numbers so later bodies can cross-reference earlier issues.
