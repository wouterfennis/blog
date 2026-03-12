# Contributing

This document explains how to work with this repository so that semantic versioning and GitHub Releases work correctly.

## How versioning works

This repository uses [release-please](https://github.com/googleapis/release-please-action) to automate semantic versioning.
Every commit merged to `main` is read by release-please, which maintains a **Release PR**.
When you merge that Release PR, release-please:

1. Creates a GitHub Release with the new version number.
2. Publishes a changelog listing all commits since the previous release.
3. Tags the commit (e.g. `v1.2.0`).
4. Updates `_data/version.yml` — which causes the site footer to display the new version on the next deploy.

You never need to manage version numbers manually.

## Commit message format (Conventional Commits)

Every commit **must** follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```text
<type>: <short description>

[optional body]

[optional footer, e.g. BREAKING CHANGE: <description>]
```

### Blog-specific mapping

| What you are doing | Commit prefix | Version bump |
| --- | --- | --- |
| Adding a new blog post | `feat:` | minor — `1.x.0` |
| Fixing a typo or editing an existing post | `fix:` | patch — `1.0.x` |
| Site redesign or breaking URL change | `feat!:` | major — `x.0.0` |

`feat!:` signals a breaking change. Alternatively, add `BREAKING CHANGE: <description>` in the commit footer.

### Examples

```text
feat: add post about GitHub Copilot experience in open source
fix: correct incorrect code sample in bicep post
fix: repair broken image link in SQL Server auth post
feat!: redesign site navigation and update permalink structure
```

## The Release PR

After you push a `feat:` or `fix:` commit to `main`, release-please automatically opens (or updates) a PR titled something like:

```text
chore(main): release 1.1.0
```

This PR contains the version bump in `_data/version.yml`, `.release-please-manifest.json`, and the updated `CHANGELOG.md`.

- **Do not close this PR** — release-please will recreate it.
- **Merge it when you are ready to cut a release.** Multiple commits accumulate in a single Release PR; you control the timing.
- After merging, the deploy workflow re-runs automatically and the site is updated.

## Files managed automatically (do not edit manually)

| File | Managed by |
| --- | --- |
| `CHANGELOG.md` | release-please |
| `_data/version.yml` | release-please (via Release PR) |
| `.release-please-manifest.json` | release-please |

Editing these files manually will cause release-please to behave unexpectedly.

## Local development

```bash
bundle install
bundle exec jekyll serve --livereload
# Site available at http://localhost:4000/blog
```

Markdown linting:

```bash
npm ci
npm run lint:md
npm run lint:md:fix   # auto-fix where possible
```
