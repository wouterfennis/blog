---
applyTo: "**"
---

# Conventional Commits for this repository

This repository uses [release-please](https://github.com/googleapis/release-please-action) for automated semantic versioning. Every commit to `main` must follow the [Conventional Commits](https://www.conventionalcommits.org/) format so the version is bumped correctly.

## Commit message format

```
<type>: <short description>
```

## Blog-specific type mapping

| What you are doing | Commit prefix | Version bump |
|---|---|---|
| Adding a new post | `feat:` | minor — `1.x.0` |
| Updating or significantly expanding an existing post | `feat:` | minor — `1.x.0` |
| Fixing a typo or small edit in an existing post | `fix:` | patch — `1.0.x` |
| Repairing a broken link or image | `fix:` | patch — `1.0.x` |
| Site redesign or any breaking URL change | `feat!:` | major — `x.0.0` |

`feat!:` signals a breaking change. Alternatively, add `BREAKING CHANGE: <description>` in the commit footer.

## Examples

```
feat: add post about using feature flags in .NET
fix: correct broken image link in sql-server-auth post
fix: fix typo in bicep-environment-specific-requirements post
feat: add part 2 of GitHub Copilot open-source series
feat!: redesign site navigation and update permalink structure
```

## Files managed automatically — never edit these manually

- `CHANGELOG.md`
- `_data/version.yml`
- `.release-please-manifest.json`

Editing these manually causes release-please to behave unexpectedly.
