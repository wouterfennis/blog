---
applyTo: "**"
---

# Creating GitHub Issues via the Chat Interface

Use the `gh` CLI (GitHub CLI) to create issues directly from the chat. The CLI is available in the terminal and authenticated as `wouterfennis` against `wouterfennis/blog`.

## Basic command

```bash
gh issue create --title "Issue title" --body "Short single-line body"
```

## Preferred approach: body from a file

For multi-line or formatted bodies, **always write the body to a temp file first** and pass it with `--body-file`. This avoids PowerShell heredoc escaping issues (backtick conflicts, quote escaping, control characters in output).

```powershell
# 1. Write the body to a temp file
$body = @"
## Goal
Describe the goal here.

## Tasks
- [ ] Task one
- [ ] Task two

## Verification
How to confirm this is done.
"@
$tmp = New-TemporaryFile
Set-Content -Path $tmp -Value $body -Encoding UTF8

# 2. Create the issue using --body-file
gh issue create --title "My issue title" --body-file $tmp

# 3. Clean up
Remove-Item $tmp
```

## Adding labels

Labels must exist in the repo before they can be assigned. Check available labels first:

```bash
gh label list
```

Then add with `--label`:

```bash
gh issue create --title "My issue" --body-file $tmp --label "enhancement"
```

If the label does not exist, the command fails. Either create the label first (`gh label create`) or omit `--label`.

## Listing and verifying issues

After creation, verify with:

```bash
gh issue list --limit 5 --repo wouterfennis/blog 2>&1
```

Always use `--repo` and `2>&1` for the verification command. This ensures the output is captured cleanly regardless of the current working directory and that stderr (e.g. "Creating issue in...") is merged into stdout.

**Important:** Only run the verification command **once** and wait for its output. Do not re-run it if the terminal output looks empty or truncated — the previous command may still be flushing output. Retrying causes unnecessary approval prompts for the user.

## Multi-issue workflow

When creating several related issues (e.g., phased work), create them sequentially and record the assigned issue numbers for cross-referencing. Use `--body-file` for each to keep the terminal output clean.

## Useful flags

| Flag | Purpose |
|------|---------|
| `--title` | Issue title (required) |
| `--body-file` | Path to a file containing the issue body (preferred for long bodies) |
| `--body` | Inline body string (use only for very short single-line text) |
| `--label` | Assign an existing label (can be repeated) |
| `--assignee @me` | Assign to yourself |
| `--milestone` | Assign to a milestone by title |
| `--web` | Open the created issue in the browser |
