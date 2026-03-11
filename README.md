# Wouter Compiles IT — Blog

Personal blog by Wouter Fennis, migrated from WordPress (`woutercompiles.it`) to **Jekyll** hosted on **GitHub Pages**.

## Why Jekyll?

Jekyll is a static site generator that converts Markdown files into a complete HTML website. It was chosen for this blog because:

- **Native GitHub Pages support** — No external hosting needed. Pushing to `main` triggers an automatic build and deploy via GitHub Actions.
- **Write in Markdown** — Posts are plain `.md` files in `_posts/`. No database, no CMS, no admin panel.
- **URL preservation** — The `permalink: /:year/:month/:day/:title/` setting reproduces the original WordPress URL structure exactly (e.g. `/2024/06/16/client-certificates-in-asp-net/`).
- **Automatic post listing** — The home page lists all posts sorted by date without any manual maintenance.
- **Built-in plugins** — `jekyll-feed` (RSS), `jekyll-seo-tag` (SEO meta tags), and `jekyll-sitemap` are configured and run automatically on every build.
- **Free hosting, zero server maintenance** — The entire blog lives as plain text files in Git. No server to manage or pay for.

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
```

## Local development

```bash
bundle install
bundle exec jekyll serve --livereload
# Site available at http://localhost:4000/blog
```

## Markdown linting

This repository uses `markdownlint-cli` to keep all Markdown files consistent.

```bash
npm install
npm run lint:md
```

To auto-fix issues that are fixable:

```bash
npm run lint:md:fix
```

Markdown linting runs in CI on every push to `main` and on every pull request.

## Deployment

Push to `main` → GitHub Actions builds with Jekyll and deploys to GitHub Pages automatically.

Enable GitHub Pages in the repo settings under **Pages → Source → GitHub Actions**.

## Adding a new post

Create a file in `_posts/` following the naming convention:

```text
_posts/YYYY-MM-DD-slug-from-title.md
```

Every post must include this front matter:

```yaml
---
layout: post
title: "Post title here"
date: YYYY-MM-DD
categories: [Category]   # one of: Programming, Architecture, CI CD, Scrum
tags: [tag1, tag2]
---
```
