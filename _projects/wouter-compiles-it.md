---
title: "Wouter Compiles IT blog"
description: "The source of this blog: a Jekyll site on GitHub Pages, migrated from WordPress with GitHub Copilot and extended with Claude Code tooling."
github_url: "https://github.com/wouterfennis/blog"
tags: [jekyll, github pages, github actions, ruby, mermaid, seo, claude code, github copilot]
order: 6
---

## About this project

This is the repository behind the blog you are reading. It started as a self-hosted WordPress site and is now a static Jekyll site, built and deployed by GitHub Actions to GitHub Pages. The original URL structure was preserved, so existing links keep working. How the migration went, including where GitHub Copilot hallucinated, is described in [Migrate your blog towards GitHub Pages](/2026/03/29/migrate-your-blog-towards-github-pages/).

The blog is also my playground for treating content as code: every post is a Markdown file, every change is a commit, and quality gates run before anything is published.

## Key features

- Jekyll with the Minima theme, plus a custom home page, category pages, tag pages and an archive
- Automated build and deployment with GitHub Actions on every push to `main`
- Mermaid diagrams, rendered in the browser and loaded only on posts that need them
- SEO and AI search groundwork: structured data, FAQ markup, related posts, a generated `llms.txt` and `llms-full.txt`, and an explicit crawler policy in `robots.txt`
- Markdownlint on every Markdown change, enforced through a Claude Code hook
- Claude Code subagents and skills for pre-publish review, spelling and grammar, content strategy and post promotion
- Automated semantic versioning with release-please and Conventional Commits

## Getting started

Clone the repository and run the site locally with live reload:

```bash
git clone https://github.com/wouterfennis/blog.git
cd blog
bundle install
npm install
bundle exec jekyll serve --livereload
```

The site is then available at `http://localhost:4000`. See the [README](https://github.com/wouterfennis/blog#readme) for the writing workflow and the quality checks.
