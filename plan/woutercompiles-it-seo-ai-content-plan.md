# Wouter Compiles IT — SEO, AI-Crawler & Content Improvement Plan

**Site:** <https://woutercompiles.it/> (Jekyll, `minima` theme, GitHub Pages)
**Repo:** <https://github.com/wouterfennis/blog>
**Prepared:** 2026-09-10
**Purpose:** A prioritized, agent-actionable backlog. Every item below is scoped so it can be pasted as a GitHub issue with clear acceptance criteria. Items already tracked in the repo's open issues are referenced, not duplicated.

---

## 0. Baseline audit (what's already in place)

Good foundation already exists — don't rebuild these:

- Jekyll plugins active: `jekyll-feed` (RSS), `jekyll-seo-tag` (meta/OG/Twitter cards + JSON-LD), `jekyll-sitemap` (`/sitemap.xml`).
- Per-post front matter already includes canonical URL, OG/Twitter tags, `article:published_time`.
- Clean permalink structure preserved from WordPress (`/:year/:month/:day/:title/`).
- Descriptive image alt text observed on sampled posts.
- Categories (`Programming`, `CI CD`, `Scrum`, `Architecture`) and tags already used in front matter.
- Google Analytics configured (`google_analytics: G-SZPGCBPM4T`).

Already-open repo issues this plan intentionally does **not** duplicate — sequence your new SEO/content work around them:
`#18` tag index pages, `#20` pagination, `#21` related posts, `#23` TOC, `#26` Giscus comments, `#30` Pagefind search, `#42-44` Playwright testing, `#50` Projects section.

Confirmed gaps (from live inspection): no `robots.txt` in repo, no `llms.txt`/AI-crawler policy, no visible breadcrumb schema, no 404 page confirmed, no explicit "last updated" distinct from "published" on evergreen technical posts, no content-gap/pillar-page strategy, no internal cross-linking system beyond category pages.

---

## Workstream A — Technical SEO Foundations

### A1. Add explicit `robots.txt`

- **Why:** Jekyll/GitHub Pages doesn't generate one by default; currently relying on implicit "allow all," which gives no control over crawl budget or bad bots.
- **Task:** Create `/robots.txt` (static file, Jekyll passes it through) allowing all reputable crawlers, pointing to sitemap.
- **Acceptance criteria:**
  - File at repo root, output at `https://woutercompiles.it/robots.txt`.
  - Contains `Sitemap: https://woutercompiles.it/sitemap.xml`.
  - `User-agent: *` / `Allow: /` baseline (site has no private sections to block).
- **Effort:** XS

### A2. Verify/extend JSON-LD structured data

- **Why:** `jekyll-seo-tag` emits basic `WebSite`/`BlogPosting`/`Person` JSON-LD, but coverage should be confirmed and extended for rich results.
- **Task:**
  1. Confirm `jekyll-seo-tag` JSON-LD output on home, post, and about pages (view page source, not just meta tags).
  2. Add `author` as a full `Person` object (name, url → `/about/`, `sameAs` → LinkedIn + GitHub) via `_config.yml` `author` block if not already picked up.
  3. Add `BreadcrumbList` schema to post layout (Home → Category → Post).
  4. Consider `TechArticle` type for deeply technical posts vs generic `BlogPosting`.
- **Acceptance criteria:** Google Rich Results Test passes with no errors for home page, one post, and the about page; breadcrumbs validate.
- **Effort:** S

### A3. Custom 404 page

- **Why:** No confirmed custom 404; GitHub Pages default 404 hurts UX and wastes crawl signals.
- **Task:** Add `404.html` at root with `permalink: /404.html`, site nav, and a search/link-back CTA (pairs well with `#30` Pagefind once shipped).
- **Acceptance criteria:** Visiting a non-existent path returns styled 404 with working nav.
- **Effort:** XS

### A4. Favicon & web app manifest

- **Why:** Not confirmed present; affects branding in search results, browser tabs, bookmarks, and mobile "add to home screen."
- **Task:** Add full favicon set (`favicon.ico`, `apple-touch-icon.png`, SVG favicon) + `site.webmanifest`, wired into `_includes/head`/theme override.
- **Acceptance criteria:** Favicon renders in browser tab, Google SERP, and social shares; manifest validates.
- **Effort:** XS

### A5. Image optimization pass

- **Why:** Featured images (PNG, e.g. `featured-blog-migration.png`) are likely uncompressed; affects Core Web Vitals (LCP) which is a ranking factor.
- **Task:**
  1. Convert/serve featured + inline images as WebP/AVIF with fallback (Jekyll plugin `jekyll-picture-tag` or a build-step script in the deploy workflow).
  2. Add explicit `width`/`height` attributes to prevent layout shift (CLS).
  3. Add `loading="lazy"` to below-the-fold images.
- **Acceptance criteria:** Lighthouse Performance score ≥ 90 mobile on a representative post; no CLS warnings.
- **Effort:** M

### A6. Core Web Vitals / Lighthouse CI baseline

- **Why:** No automated performance regression check exists in CI.
- **Task:** Add a Lighthouse CI GitHub Action step (post-build, pre/post-deploy) that fails the build below defined thresholds.
- **Acceptance criteria:** CI job reports Performance/SEO/Accessibility/Best Practices scores on every PR; thresholds documented in workflow file.
- **Effort:** S
- **Depends on:** A5 (do image work first or thresholds will fail immediately).

### A7. Heading hierarchy & accessibility audit

- **Why:** Structured, semantic headings help both SEO crawlers and AI summarization; also required for WCAG.
- **Task:** Audit all posts for a single `<h1>` (post title) followed by logical `##`/`###` nesting (no skipped levels); fix in existing posts where broken.
- **Acceptance criteria:** `axe-core`/Lighthouse Accessibility flags zero heading-order issues across sampled posts.
- **Effort:** S

### A8. Internal link-checker in CI

- **Why:** Broken internal/external links silently hurt SEO and trust over time as the archive grows.
- **Task:** Add a link-checking step (e.g. `lychee` or `markdown-link-check`) to CI, running against built HTML output.
- **Acceptance criteria:** CI fails PRs that introduce broken internal links; scheduled weekly run flags broken external links as an issue/report.
- **Effort:** S

---

## Workstream B — AI Crawler & LLM Discoverability

This is the newer, fast-moving half of "SEO" — making the site legible to AI answer engines (ChatGPT/Perplexity/Claude/Gemini) in addition to classic search.

### B1. Explicit AI-crawler policy in `robots.txt`

- **Why:** Right now there's no stated position on AI training/crawling — default is ambiguous. Wouter should decide policy (allow indexing/citation, block training use, or allow both) rather than leave it to defaults.
- **Task:** Add explicit user-agent blocks in `robots.txt` for known AI crawlers (`GPTBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-Web`, `PerplexityBot`, `CCBot`, `Google-Extended`, `Bytespider`, `Amazonbot`), with an `Allow: /` default (recommended, since the goal is discoverability/citation, not blocking) — but make the choice explicit and documented rather than implicit.
- **Acceptance criteria:** `robots.txt` lists each bot explicitly with a stated allow/disallow decision; decision documented in a short comment or `CONTRIBUTING.md` note explaining the rationale.
- **Effort:** XS
- **Depends on:** A1.

### B2. Add `llms.txt`

- **Why:** `llms.txt` is an emerging convention (root-level Markdown index) that gives AI agents/crawlers a clean, structured summary of the site and its key pages — much higher signal-to-noise than crawling raw HTML.
- **Task:** Create `/llms.txt` with: site purpose, author, list of key pages (About, Projects) and a curated list of posts (title + 1-line summary + URL), grouped by category. Auto-generate the post list from `_posts` via a Jekyll generator/plugin or a build script so it stays current.
- **Acceptance criteria:** `https://woutercompiles.it/llms.txt` returns valid Markdown; regenerates automatically on new posts (verified via CI or a Jekyll plugin, not manually maintained).
- **Effort:** M

### B3. Machine-readable author/E-E-A-T signals

- **Why:** AI answer engines and Google's E-E-A-T weighting favor content with clear, verifiable authorship and expertise signals.
- **Task:**
  1. Expand `/about/` with concrete expertise signals: years of experience, specific technologies, links to talks/OSS contributions if any.
  2. Ensure `Person` schema (A2) is consistent across every post, not just home page.
  3. Add an `author.md` data file (`_data/author.yml`) as single source of truth for bio/credentials, reused across schema + about page + post bylines.
- **Acceptance criteria:** Author identity/credentials are consistent and machine-readable across home, about, and every post's structured data.
- **Effort:** S

### B4. Content structured for extraction/citation

- **Why:** AI answer engines favor content that's easy to lift a clean, self-contained answer from (clear question-style subheadings, concise definitional paragraphs, summary boxes).
- **Task:** Establish a lightweight content pattern for future/updated posts:
  - A 2-3 sentence "TL;DR" or key-takeaway callout near the top of long technical posts.
  - Prefer descriptive `##` subheadings that read like the questions a reader/AI would ask ("How does X differ from Y?" rather than "Comparison").
  - Keep code/config snippets in fenced blocks with language hints (already done — keep enforcing via markdownlint).
- **Acceptance criteria:** Written as a short style-guide section in `CONTRIBUTING.md`; applied to at least the 3 most-recent posts as a pilot.
- **Effort:** S (guideline) + M (retrofit pilot posts)

### B5. RSS feed enrichment

- **Why:** `jekyll-feed` is active, but full-content feeds (vs. summary-only) are more useful both for RSS readers and for AI agents/aggregators that consume feeds as a primary discovery mechanism.
- **Task:** Confirm feed emits full post content (not truncated excerpt); ensure categories/tags are included as feed `<category>` elements.
- **Acceptance criteria:** `/feed.xml` validates via W3C Feed Validator and includes full content + categories per entry.
- **Effort:** XS

---

## Workstream C — Missing Content & Content Strategy

### C1. Content gap analysis by category

- **Why:** Four categories exist (Programming, CI/CD, Scrum, Architecture) but post count/depth is uneven (from the visible archive, most recent posts skew toward tooling/AI-assisted workflow rather than the stated core topics of .NET/Azure/architecture).
- **Task:** Agent should enumerate all existing posts per category/tag, compare against the site's stated positioning ("Microsoft/.NET development, Azure, CI/CD pipelines, software architecture, team collaboration"), and produce a gap list — e.g., is there real Azure content? Real Scrum content beyond the category label existing? Flag categories with 0-1 posts as priority for new content or repositioning.
- **Acceptance criteria:** A markdown report (`_meta/content-gap-analysis.md` or similar, non-published) listing post counts per category/tag and explicit recommended topics to close gaps.
- **Effort:** S (analysis only — actual writing is Wouter's, not the agent's)

### C2. Pillar/cornerstone content pages

- **Why:** A collection of standalone posts with no hub page limits internal linking equity and topical authority signals (both classic SEO and AI-citation relevance).
- **Task:** For each category with ≥3 posts, build a pillar page (e.g. `/pillars/dotnet-azure/`) that summarizes the topic and links out to every relevant post, updated as new posts are added. Distinguish from the existing plain category listing pages (`/category/*`) by adding real editorial content, not just an auto-listing.
- **Acceptance criteria:** At least one pillar page shipped as a template others can be cloned from; linked from home page and relevant post footers.
- **Effort:** M
- **Note:** Complements `#18` (tag index) and `#21` (related posts) — sequence after those ship since pillar pages should link into the tag/related-post system, not duplicate it.

### C3. "Last reviewed/updated" distinct from "published"

- **Why:** Technical posts (Azure, .NET, CI/CD tooling) go stale; content freshness is both an SEO and AI-trust signal. Currently only `article:published_time` is set.
- **Task:** Add optional `last_updated` front-matter field; display "Last reviewed: <date>" on post layout when present and different from publish date; add `article:modified_time` to structured data when set.
- **Acceptance criteria:** Front-matter field supported, rendered conditionally, reflected in JSON-LD.
- **Effort:** XS

### C4. Expand About page into a fuller "hire me / who is Wouter" resource

- **Why:** About page is thin (from repo listing, `about.md` exists but content depth unconfirmed) and is a high-value page for both search snippet quality and AI-answer attribution ("who is Wouter Fennis").
- **Task:** Expand with: current role summary, specific technology stack, notable projects (link to `#50` Projects section once shipped), speaking/writing history if any, contact method.
- **Acceptance criteria:** About page passes a "could an AI answer 'who is Wouter Fennis and what does he write about' using only this page" check.
- **Effort:** S

### C5. Glossary / definitions page (optional, high AI-citation value)

- **Why:** Short, canonical definitions of recurring terms (e.g. "What is CI/CD," "What is a Scrum sprint") are exactly the kind of content AI answer engines like to cite, and they internally cross-link well.
- **Task:** Evaluate feasibility; if pursued, create `/glossary/` with short entries linking back to the fuller posts that cover each topic.
- **Acceptance criteria:** Decision recorded either way; if built, ≥10 terms with links to source posts.
- **Effort:** M (deprioritize below A/B items — nice-to-have)

### C6. Cross-linking audit for existing posts

- **Why:** Older posts likely don't link forward to newer, related posts (a common gap as blogs grow) — hurts both crawl depth and topical clustering.
- **Task:** Manual/agent-assisted pass adding 2-3 contextual internal links per existing post to related posts, once tag/related-post infra (`#18`/`#21`) exists.
- **Acceptance criteria:** Every existing post has at least 2 internal links to other posts beyond the auto "next post" link.
- **Effort:** M
- **Depends on:** `#18`, `#21`.

---

## Workstream D — Measurement & Governance

### D1. Google Search Console + Bing Webmaster Tools setup

- **Why:** GA4 is configured, but indexing/query-level visibility (impressions, CTR, indexing errors) requires Search Console; not confirmed as connected.
- **Task:** Verify domain in Google Search Console and Bing Webmaster Tools, submit sitemap, confirm no coverage errors.
- **Acceptance criteria:** Both consoles show verified ownership and an accepted sitemap; document verification method used (DNS/HTML file) in repo notes.
- **Effort:** XS (manual, one-time)

### D2. Structured data monitoring in CI

- **Why:** Prevent regressions in the JSON-LD work from A2/B3.
- **Task:** Add a CI step running Schema.org validation (e.g. `structured-data-testing-tool` or a Rich Results API check) against built pages.
- **Acceptance criteria:** CI fails on invalid/missing required schema fields on post pages.
- **Effort:** S
- **Depends on:** A2.

### D3. Periodic SEO/AI-visibility audit cadence

- **Why:** SEO and AI-crawler conventions (llms.txt, bot user-agents) are still evolving; this isn't a one-time project.
- **Task:** Document a recurring (quarterly) checklist: re-check `robots.txt` bot list against current major AI crawlers, re-run Lighthouse, re-check Search Console coverage, review content-gap report from C1.
- **Acceptance criteria:** Checklist committed to repo (e.g. `docs/seo-audit-checklist.md`) with a recurring GitHub issue/reminder mechanism.
- **Effort:** XS

---

## Suggested Execution Order (Phases)

**Phase 1 — Foundations (do first, low effort/high leverage):**
A1 robots.txt → B1 AI-crawler policy → A3 404 page → A4 favicon/manifest → B5 RSS check → C3 last-updated field → D1 Search Console/Bing setup

**Phase 2 — Structured data & discoverability:**
A2 JSON-LD extension → B3 author/E-E-A-T → B2 llms.txt → D2 schema CI check

**Phase 3 — Performance & quality gates:**
A5 image optimization → A6 Lighthouse CI → A7 heading audit → A8 link checker

**Phase 4 — Content strategy (sequence after `#18`/`#21`/`#30` ship, since they're prerequisites):**
C1 gap analysis → C6 cross-linking audit → C2 pillar pages → C4 expand About → B4 content-structure guideline (pilot) → C5 glossary (optional)

**Phase 5 — Governance:**
D3 recurring audit checklist

---

## Suggested new GitHub labels

`seo`, `ai-crawlers`, `structured-data`, `performance`, `content-strategy`, `governance` — to sit alongside the existing `enhancement`, `content-discovery`, `community`, `ux`, `navigation` labels already in use.

## Notes for the implementing agent

- This repo restricts issue creation to the owner (`wouterfennis`) per the repo settings observed — each item above should be handed to Wouter to file, or filed via an authenticated agent with write access; don't assume open issue creation.
- Every Phase-1/2/3 item is infra/config work with no editorial judgment required — safe for full agent automation.
- Phase 4 items require Wouter's domain judgment (what to actually write about) — the agent's job there is analysis and scaffolding (C1, C2 templates, C6 mechanical link insertion), not authoring new posts.
