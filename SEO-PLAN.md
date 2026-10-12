# SEO and AI search plan (temporary)

Delete this file when all points are done. Status: `[ ]` open, `[x]` done, `[-]` skipped.

## Points

- [x] 1. Generate `llms.txt` from `site.posts` and add `llms-full.txt`
- [x] 2. Strengthen internal linking: "Related posts" block in `post.html` and manual links
- [ ] 3. Richer structured data: `social` config, author entity, remove duplicate microdata, `last_modified_at`
- [ ] 4. Write for AI extraction: summaries, key takeaways, question headings, FAQ sections
- [ ] 5. Tag pages
- [ ] 6. About page: E-E-A-T and `Person` schema
- [ ] 7. Image tuning: dimensions, lazy loading, WebP consistency
- [ ] 8. `robots.txt` and sitemap tweaks
- [ ] 9. Smaller content items: descriptions, cadence, cross-posting

## Working agreement

- Ask specific questions before starting each point.
- Verify with `npm run lint:md` and `bundle exec jekyll build` after each point.
- Do not commit without being asked; commit prefixes follow `.claude/rules/conventional-commits.md`.

## Notes per point

Findings and decisions are added below as each point is worked.

### Point 1 (done)

- `llms.txt` is now a Liquid template (latest 10 posts, decided by author); `llms-full.txt` holds all posts in Markdown.
- `_plugins/raw_markdown.rb` exposes raw Markdown (Liquid image paths turned into absolute URLs). Works because CI uses `bundle exec jekyll build`.
- `SEO-PLAN.md` is excluded from the build in `_config.yml`; remove that entry when deleting this file.

### Point 2 (done)

- `_includes/related-posts.html` (3 posts: shared tags weight 10, shared category weight 1, newest first), included in `_layouts/post.html`, styles in `assets/main.scss`.
- Posts with no internal links: sonarqube, retrospective (pizzaria), bicep, archimate, copilot. Links are proposed to the author first.
- Author-approved in-text links added: sonarqube to verify, bicep to managed identities, pizzaria to wheel of misfortune, archimate to technorama, copilot to GitHub Pages migration ("See also").
- Gotcha: the lint hook uses the shell cwd; run commands from the repo root or `.markdownlint` config is not found.
