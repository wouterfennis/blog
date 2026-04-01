# Wouter Compiles IT — Blog (Jekyll / GitHub Pages)

## Project overview

Personal blog migrated from WordPress (`woutercompiles.it`) to **Jekyll** hosted on **GitHub Pages**.
Author: Wouter Fennis — Software Engineer and Scrum Master.

## Repository structure

```
_posts/          # All blog posts as Markdown files
_config.yml      # Jekyll site configuration (theme, plugins, permalink pattern)
Gemfile          # Ruby gems (jekyll ~4.3, minima theme, feed/seo/sitemap plugins)
index.md         # Home page
about.md         # About page
.github/
  workflows/
    deploy.yml   # CI: build + deploy to GitHub Pages on push to main
```

## Post file naming & front matter

Posts live in `_posts/` and follow the Jekyll convention:

```
_posts/YYYY-MM-DD-slug-from-title.md
```

Every post **must** have this front matter block:

```yaml
---
layout: post
title: "Exact title here"
date: YYYY-MM-DD
categories: [Category]        # one of: Programming, Architecture, CI CD, Scrum
tags: [Tag1, Tag2]            # lowercase, space-separated words from the original post
---
```

Categories mirror the original WordPress categories exactly (capitalised as shown above).
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

Using the default **minima** theme (`~> 2.5`). Skin is set to `auto` (follows system dark/light preference). Social links (GitHub, LinkedIn) are configured in `_config.yml` under `minima.social_links`.

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

