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
- [ ] 8. External identity consistency and certification links [19]
- [ ] 9. Content freshness review [21]
- [ ] 10. Content gaps and topic ideas [14]
- [ ] 11. Automated validation in CI [23]
- [ ] 12. SEO and GEO documentation [24]
- [ ] 13. Search Console and Bing monitoring baseline [20]
- [ ] 14. Should we do something with this Lighthouse library inside a build pipeline etc?

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
