## Checklist

- [ ] Markdown files pass `npm run lint:md`
- [ ] New post uses `_posts/YYYY-MM-DD-slug-from-title.md`
- [ ] Front matter includes `layout`, `title`, `date`, `categories`, and `tags`
- [ ] Post includes a **References** section

## Commit message format (Conventional Commits)

This repo uses [Conventional Commits](https://www.conventionalcommits.org/) to automate semantic versioning.
Use one of the prefixes below for every commit on this PR:

| What you did | Prefix | Version bump |
| --- | --- | --- |
| Added a new blog post | `feat:` | minor (1.**x**.0) |
| Fixed a typo / edited an existing post | `fix:` | patch (1.0.**x**) |
| Site redesign / breaking URL change | `feat!:` | major (**x**.0.0) |

Examples: `feat: add post about GitHub Copilot experience`, `fix: correct code sample in bicep post`
