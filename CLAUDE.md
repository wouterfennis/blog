# Wouter Compiles IT — Blog (Jekyll / GitHub Pages)

## Project overview

Personal blog migrated from WordPress (`woutercompiles.it`) to **Jekyll** hosted on **GitHub Pages**.
Author: Wouter Fennis — Software Engineer and Scrum Master.

## Repository structure

```text
_posts/          # All blog posts as Markdown files
_config.yml      # Jekyll site configuration (theme, plugins, permalink pattern)
Gemfile          # Ruby gems (jekyll ~4.3, minima theme, feed/seo/sitemap plugins)
index.md         # Home page
about.md         # About page
.github/
  workflows/
    deploy.yml   # CI: build + deploy to GitHub Pages on push to main
docs/            # seo-geo.md (SEO/GEO architecture and how to add a post), identity.md, content-ideas.md
.claude/
  rules/         # writing-style + language (loaded when touching _posts/), conventional-commits
  agents/        # Subagents (see "Claude Code tooling" below)
  skills/        # Slash commands (see "Claude Code tooling" below)
  hooks/         # lint-md.mjs: runs markdownlint after every Markdown edit
  settings.json  # Shared permissions and hooks
```

## Post file naming & front matter

Posts live in `_posts/` and follow the Jekyll convention:

```text
_posts/YYYY-MM-DD-slug-from-title.md
```

Every post **must** have this front matter block (this is the single source of truth — other files refer here):

```yaml
---
layout: post
title: "Exact title here"
date: YYYY-MM-DD                # must match the filename date
categories: [Category]          # one or more of: Programming, Architecture, CI CD, Scrum
image: /assets/images/YYYY/MM/filename.ext   # same image as the feature image in the body
description: "One or two sentences, max 160 characters, keyword-rich."
tags: [tag one, tag two]        # 4-8 tags, all lowercase, spaces between words
mermaid: true                   # only when the body contains a mermaid code block
---
```

- Optional: `featured: true` (shows the post under Featured articles on the home page), `last_modified_at: YYYY-MM-DD` (set on substantive updates; becomes `dateModified`) and `faq:` (list of `question`/`answer` pairs, rendered as a FAQ section with FAQPage JSON-LD).
- `description` is the search snippet and social preview: do not copy the opening paragraph verbatim.
- Categories mirror the original WordPress categories exactly (capitalised as shown above).
  `CI CD` is used without a hyphen (matching the original site's `/category/cicd/` slug).

## Permalink pattern

Configured in `_config.yml` as `/:year/:month/:day/:title/` to preserve the original
WordPress URL structure (e.g. `/2025/11/14/my-experience-with-github-copilot-in-an-open-source-project/`).

## Local development

```bash
bundle install
bundle exec jekyll serve --livereload
# Site available at http://localhost:4000
```

## Deployment

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds with Jekyll and deploys to GitHub Pages automatically.
Enable GitHub Pages in the repo settings under **Pages → Source → GitHub Actions**.

## Theme

Using the **minima** theme (`~> 2.5`) with a custom visual layer. Social links (GitHub, LinkedIn) are configured in `_config.yml` under `minima.social_links`.

- Styles live in `assets/main.scss` (design tokens as CSS variables, base typography) and `_sass/components.scss` (header, badges, tiles, post extras).
- Colours are CSS variables: change the indigo accent, surfaces and category tints once in the `:root` block (and `dark-tokens` mixin) of `assets/main.scss`. Use the `in-dark` mixin for rules that differ in dark mode.
- Dark mode follows the OS and can be overridden with the header toggle (`assets/js/theme-toggle.js`, choice saved in `localStorage`, applied early by a script in `_includes/head.html`). The `skin: auto` setting in `_config.yml` has no effect with minima 2.5.
- Fonts are system stacks (sans UI, serif article body); there are no web fonts to load.
- Category badges use `_includes/category-badge.html`; a new category needs a tint in the `$categories` list and the `--cat-*` variables.
- Posts get a reading-progress bar, a contents list and heading anchors from `assets/js/post-enhancements.js`.

## Content conventions

- Articles include a **References** section at the bottom linking to external sources.
- Code samples in posts use fenced code blocks with language identifiers (e.g. ` ```csharp `).
- Images are stored locally in `assets/images/YYYY/MM/` and referenced with paths like `![alt](/assets/images/2023/02/filename.png)`.
  When adding images for new posts, place them in `assets/images/YYYY/MM/` matching the post date and update the src accordingly.
- Posts that are part of a series use a `Part N:` prefix in the title.
- **Diagrams** use [Mermaid](https://mermaid.js.org/) as the standard library. Use a fenced ` ```mermaid ` code block in the post body. Add `mermaid: true` to the post's front matter so the Mermaid.js script is loaded on that page.

## Markdown quality gate

- All `.md` file changes must pass `npm run lint:md` before completion.
- Prefer fixing lint violations over adding ignore directives.
- Keep Jekyll front matter intact and valid YAML.
- Keep ordered list numbering style consistent to satisfy markdownlint rules.

## Claude Code tooling

Subagents (`.claude/agents/`) edit files directly and report briefly what they changed.
Each has a "Token discipline" section (targeted reads, no re-reads, batched edits); keep it when changing an agent:

- `pre-publish-reviewer` — full pre-publish checklist and SEO pass for one post. Use it before every publish.
- `content-strategist` — read-only content strategy report across all posts.
- `english-spelling-and-grammar-assistant` — spelling and grammar fixes for a file or text.

Slash commands (`.claude/skills/`), all manually invoked:

- `/new-post <title, category, type, tags>` — scaffold a new post.
- `/post-outline <topic>` — produce a writing brief, creates no files.
- `/create-issue <summary>` — create a GitHub issue with `gh`.
- `/lean-mode [task]` — token-saving working rules for the rest of the session.
- `/post-publish <post>` — draft LinkedIn text, dev.to front matter (canonical URL) and the indexing checklist.
- `/handoff [focus]` — compact session summary so you can `/clear` and continue cheaply.

Token-saving scripts (`.claude/scripts/`, zero-token deterministic work):
`npm run check:post -- <path>` lists checklist violations for one post (exit 1 when any),
`npm run posts:index` prints one line per post (date-slug, categories, title, tags),
`npm run check:site` crawls the built `_site` (links, images, titles, descriptions, H1, JSON-LD, sitemap),
`npm run images:optimize` converts PNG/JPEG over 300 KB (front matter images to JPEG, others to WebP) and updates references.
`settings.json` denies reads of `node_modules`, `_site`, `vendor`, `.bundle` and the lock files.

Commands: `npm run lint:md` (also runs automatically via a hook after Markdown edits),
`bundle exec jekyll build` to verify the site builds.

CI: `.github/workflows/site-checks.yml` runs on every pull request (build, `check:site`, `check:post` on changed posts and Lighthouse CI with the thresholds in `lighthouserc.json`). More background in `docs/`.
