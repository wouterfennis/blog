# Issue 54 plan: open SEO and GEO points (temporary)

Source: <https://github.com/wouterfennis/blog/issues/54>. Delete this file when done, and remove its `exclude:` entry in `_config.yml`.
Status: `[ ]` open, `[x]` done, `[-]` skipped.

## Points (issue workstream in brackets)

- [x] 1. Structured data gaps: BreadcrumbList with visible breadcrumbs, Blog entity, articleSection, publisher [3]
- [x] 2. Homepage: expertise, featured articles, featured projects, topics [13]
- [-] 3. Information architecture: topic and pillar pages, projects linked with articles [5, 6, 7, 12]
- [x] 4. Article structure and first-hand experience for the remaining posts [8, 9]
- [ ] 5. Title and search-intent audit [10]
- [ ] 6. Performance: measure, heavy images, JavaScript, fonts [17]
- [ ] 7. Accessibility audit and fixes [18]
- [ ] 8. External identity consistency and certification links [19]
- [ ] 9. Content freshness review [21]
- [ ] 10. Content gaps and topic ideas [14]
- [ ] 11. Automated validation in CI [23]
- [ ] 12. SEO and GEO documentation [24]
- [ ] 13. Search Console and Bing monitoring baseline [20]

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
