# Issue 54 plan: open SEO and GEO points (temporary)

Source: <https://github.com/wouterfennis/blog/issues/54>. Delete this file when done, and remove its `exclude:` entry in `_config.yml`.
Status: `[ ]` open, `[x]` done, `[-]` skipped.

## Points (issue workstream in brackets)

- [x] 1. Structured data gaps: BreadcrumbList with visible breadcrumbs, Blog entity, articleSection, publisher [3]
- [x] 2. Homepage: expertise, featured articles, featured projects, topics [13]
- [-] 3. Information architecture: topic and pillar pages, projects linked with articles [5, 6, 7, 12]
- [x] 4. Article structure and first-hand experience for the remaining posts [8, 9]
- [x] 5. Title and search-intent audit [10]
- [x] 6. Performance: measure, heavy images, JavaScript, fonts [17]
- [x] 7. Accessibility audit and fixes [18]
- [x] 8. External identity consistency and certification links [19]
- [x] 9. Content freshness review [21]
- [x] 10. Content gaps and topic ideas [14]
- [x] 11. Automated validation in CI [23]
- [x] 12. SEO and GEO documentation [24]
- [-] 13. Search Console and Bing monitoring baseline [20]
- [x] 14. Should we do something with this Lighthouse library inside a build pipeline etc?

## Working agreement

- Ask specific questions before starting each point.
- Verify after each point with `npm run lint:md`, `bundle exec jekyll build` and the crawl script.
- Do not add structured data that is not supported by visible content.
- Do not commit without being asked; commit prefixes follow `.claude/rules/conventional-commits.md`.

## Notes per point

Findings and decisions are added below as each point is worked.

### Point 1 (done)

- `_includes/breadcrumbs.html`: visible trail plus BreadcrumbList JSON-LD on posts (Home > first category > post), category pages and tag pages (Home > Tags > tag).
- `_plugins/post_structured_data.rb` extends the seo-tag BlogPosting with `articleSection` (first category) and `publisher` (Wouter Fennis as Person, author's choice).
- Not done on purpose: Blog entity on the home page (author skipped it).

### Point 2 (done)

- Home page: Featured articles (front matter `featured: true`; migrate and Copilot posts), Topics (the four categories with description and post count), Latest posts (excludes featured ones to avoid duplicates).
- Not done on purpose: featured projects and an expertise list (author did not pick them).

### Point 3 (skipped)

- Author skipped topic and pillar pages for now (questions on pillars, location and linking were all answered "skip").

### Point 4 (done, first-hand experience review skipped)

- Key takeaways plus a 2-question FAQ (front matter `faq:`) added to the remaining 9 posts, so all 14 posts now have both. Drafted from each post's own text; please review the wording.
- Replaced the leftover `<!-- TODO: add references -->` placeholders: markdownlint post gets real references, Technorama review lists the two people it links to (Erwin Staal, Ian Cooper).
- Not done on purpose: first-hand experience review (author skipped).

### Point 5 (done)

- All 8 proposed titles applied (author approved all): migrate, SonarQube, client certificates, Verify, Wheel of Misfortune, Bicep, Pizzaria, summer break. URLs unchanged; `last_modified_at` set.
- Descriptions re-checked: all 14 are at most 160 characters. Only note: the migrate description says "self-hosted blog" while the title now says WordPress.

### Point 6 (done)

- Lighthouse baseline (local, mobile emulation): performance 97 home, 100 post, 75 migrate post (LCP 12.2 s, 2.4 MB), 100 tag page; SEO 100 and best practices 100 everywhere; accessibility 91 to 92 everywhere.
- `npm run images:optimize` (new `sharp` devDependency, `.claude/scripts/optimize-images.mjs`) converts PNG/JPEG over 300 KB and updates all references. Images used as a post's `image:` front matter (social preview) become JPEG, body-only images become WebP, because not every social network renders WebP previews. GIF kept (author choice).
- Converted 6 images, for example `featured-blog-migration` 2.1 MB to 103 KB. Migrate post: performance 75 to 98, LCP 12.2 s to 2.3 s, weight 2.4 MB to 416 KB.
- `technorama-2023-2.jpg` (312 KB) is referenced by no post; left untouched.
- CSS now compressed (19 KB to 14 KB) and the two social icons got explicit width and height.
- Not fixable here: GitHub Pages sets the cache headers (10 minutes) and Google Analytics script size.

### Point 7 (done)

- Lighthouse accessibility went from 91-92 to 100 on home, tag page, and three posts (managed identities, migrate, client certificates), measured locally.
- Colours: `$grey-color` #6b6b6b and `$brand-color` #1f66c6 (minima variables, set before the import), darker syntax-highlighting tokens, no opacity on tag pills. The site is effectively light only (minima 2.5.2 has no dark skin, so `skin: auto` does nothing); no dark-mode work was needed.
- Added: skip-to-content link (own `_layouts/default.html`, a copy of the minima layout), larger nav and footer link targets, visible `:focus-visible` outlines, keyboard-focusable code blocks (`code-copy.js`).
- Not covered by Lighthouse, worth a manual check: keyboard walk-through and a screen reader pass.

### Point 8 (done, certification links deferred)

- New `docs/identity.md`: canonical name, short and long title, bio snippets, expertise and consistency rules, plus a checklist for LinkedIn, GitHub and project READMEs. `docs` is excluded from the Jekyll build.
- Certification verification links: author said "later". When the URLs are available, add them to the About list and `hasCredential.url` in `about.md`.

### Point 9 (done)

- Text edited in place, no update notes (author choice). Publication dates untouched.
  - SonarQube post: tasks `@5` to `@8`, `scannerMode: 'MSBuild'` to `'dotnet'` (both checked against the current SonarQube docs), reference URLs moved to `docs.sonarsource.com` (both fetched OK).
  - Managed identities post: Azure AD to Microsoft Entra ID (first mention says "formerly Azure AD"). Left alone on purpose: the legacy permission name "Azure Active Directory Graph > Directory.ReadAll" and the titles of external reference links. The permission has a Microsoft Graph equivalent: please verify and update by hand.
  - NuGet client post: `net6.0` to `net8.0` in the csproj snippet. The linked blogExamples repository may still target net6.0.
  - ArchiMate post: both links now point at the Open Group ArchiMate Forum overview instead of the 2.1 document (the pubs.opengroup.org spec pages sit behind a login redirect for tools).
- Post header shows "Updated <date>" when `last_modified_at` differs from `date`; 12 posts carry 2026-10-12.

### Point 10 (done)

- `docs/content-ideas.md`: four ideas recorded (Claude Code in a blog repo, AI search for a Jekyll blog, Lighthouse and images, release-please for a blog), each with category, search intent, angle, first-hand evidence, tags and internal links. Experience sections are left for the author to write.
- Not recorded (author did not pick them): Azure Dev Conference 2025 review, Service Bus vs SQL managed identity, Scrum Master AI workflows.

### Point 11 and 14 (done)

- `npm run check:site` (`.claude/scripts/check-site.mjs`): crawl of the built site; broken links and assets, missing anchors, `og:image` targets, sitemap URLs, title, description, canonical, single H1, duplicate titles, JSON-LD validity and required files. Exit code 1 on findings. Verified on the real build and on a deliberately broken page.
- `check:post`: the heading sentence-case heuristic is now a warning (never fails), so proper nouns such as "Wheel of Misfortune" do not break CI; all 14 posts pass.
- New `.github/workflows/site-checks.yml` for pull requests (deploy.yml unchanged): build, `check:site`, `check:post` on changed posts, Lighthouse CI, reports uploaded as an artifact. Not run on GitHub yet; every step was run locally.
- Lighthouse CI (`lighthouserc.json`, `npx @lhci/cli`, no package.json dependency, 4 URLs, 3 runs): thresholds performance 0.8, accessibility 0.95, best practices 0.9, SEO 0.95. A single local run scored the home page 0.84 for performance, so the performance threshold is deliberately loose; tighten it once CI numbers are known. Reports stay in the artifact (no public upload).
- Plan point 14 (Lighthouse in the pipeline) is answered by this setup.

### Point 12 (done)

- New `docs/seo-geo.md` (about 120 lines): principles, information architecture, metadata and canonicals, JSON-LD map, author entity, discovery files, content structure, images and performance, accessibility, validation, and an 11-step "How to add a new article" list. Author picked a single file plus the new-article section only.
- Linked from `CLAUDE.md` (repository structure and CI note), `README.md` (new Documentation section) and `CONTRIBUTING.md` (new Content and SEO rules section).

### Point 13 (skipped)

- Author skipped Search Console and Bing monitoring (scope and verification questions both answered "skip"). Open item for later: verification codes, sitemap submission and a baseline.
