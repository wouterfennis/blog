# Content ideas

Backlog of post ideas that rest on real, first-hand work, as the style guide asks.
Use `/post-outline <idea>` to turn one into a writing brief. Remove an idea when its post is published.
Categories are the four site categories; tags follow the front matter rules (4-8, lowercase).

## 1. Claude Code in a blog repository: agents, skills and hooks that keep quality high

- **Category:** Programming
- **Type:** technical walkthrough with lessons learned
- **Search intent:** "how do I use Claude Code subagents, skills and hooks in a repository"
- **Angle:** how this blog uses subagents for pre-publish review, a hook that lints Markdown after every edit, slash commands for outlines and promotion, and scripts that take deterministic checks away from the model to save tokens.
- **First-hand evidence:** `.claude/` in this repository, the `check:post` and `posts:index` scripts, the token discipline sections in the agents.
- **What failed or surprised:** to be written by the author (for example the hook running in the wrong directory, quoting problems in shell commands, prompts that cost more than a script).
- **Tags:** claude code, ai agents, subagents, hooks, developer productivity, prompt engineering, markdownlint, github copilot
- **Link to:** [My experience with GitHub Copilot in an open-source project](/2025/11/14/my-experience-with-github-copilot-in-an-open-source-project/), [Markdownlint: a developer's best friend for cleaner Markdown](/2025/05/19/markdownlint-a-developers-best-friend-for-cleaner-markdown/)

## 2. Making a Jekyll blog findable by AI search: what I changed and what I measured

- **Category:** Architecture
- **Type:** case study
- **Search intent:** "SEO and GEO for a static Jekyll site", "llms.txt Jekyll"
- **Angle:** the umbrella issue (#54), what turned out to matter (structured data, FAQ markup, takeaways, `llms.txt`, internal links, crawler policy) and what is only hygiene. Be honest about what could not be measured yet.
- **First-hand evidence:** issue #54, the commits "Point 1" to "Point 9", `robots.txt`, `llms.txt`, `docs/identity.md`, the crawl and `check:post` scripts.
- **What failed or surprised:** to be written by the author (for example plugins that only work with the Actions build, tools that cannot read pages behind a login redirect).
- **Tags:** seo, geo, ai search, jekyll, structured data, llms.txt, github pages, schema.org
- **Link to:** [Migrate your WordPress blog to GitHub Pages with Jekyll](/2026/03/29/migrate-your-blog-towards-github-pages/)

## 3. Lighthouse and images on a static site: from 75 to 98 by fixing one PNG

- **Category:** Programming
- **Type:** measured how-to
- **Search intent:** "improve Lighthouse score Jekyll", "convert PNG to WebP or JPEG build script"
- **Angle:** baseline Lighthouse scores per page type, the single 2.1 MB feature image behind a 12 s LCP, the sharp script that converts images and rewrites references, and why social preview images stay JPEG.
- **First-hand evidence:** Lighthouse runs before and after (migrate post: performance 75 to 98, LCP 12.2 s to 2.3 s, 2.4 MB to 416 KB), `npm run images:optimize`, accessibility from 91 to 100.
- **What failed or surprised:** to be written by the author.
- **Tags:** lighthouse, performance, core web vitals, images, webp, accessibility, jekyll, sharp
- **Link to:** idea 2 once published; [Migrate your WordPress blog to GitHub Pages with Jekyll](/2026/03/29/migrate-your-blog-towards-github-pages/)

## 4. Release-please and Conventional Commits for a blog

- **Category:** CI CD
- **Type:** practical walkthrough
- **Search intent:** "release-please for a website", "Conventional Commits for content"
- **Angle:** mapping blog work to commit types (new post is `feat`, typo is `fix`, tooling is `chore`), the release PR flow, and which files must never be edited by hand.
- **First-hand evidence:** `.claude/rules/conventional-commits.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `_data/version.yml`, the release-please workflow.
- **What failed or surprised:** to be written by the author (for example commit messages that do not follow the format, such as "Point 4").
- **Tags:** release-please, conventional commits, semantic versioning, github actions, changelog, automation, blog, ci cd
- **Link to:** [Migrate your WordPress blog to GitHub Pages with Jekyll](/2026/03/29/migrate-your-blog-towards-github-pages/)
