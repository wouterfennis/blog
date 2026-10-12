# SEO and AI search plan (temporary)

Delete this file when all points are done. Status: `[ ]` open, `[x]` done, `[-]` skipped.

## Points

- [x] 1. Generate `llms.txt` from `site.posts` and add `llms-full.txt`
- [x] 2. Strengthen internal linking: "Related posts" block in `post.html` and manual links
- [x] 3. Richer structured data: `social` config, author entity, remove duplicate microdata, `last_modified_at`
- [x] 4. Write for AI extraction: summaries, key takeaways, question headings, FAQ sections
- [x] 5. Tag pages
- [x] 6. About page: E-E-A-T and `Person` schema
- [x] 7. Image tuning: dimensions, lazy loading, WebP consistency
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

### Point 3 (done)

- `social:` (Person, LinkedIn and GitHub sameAs) in `_config.yml`; `_data/authors.yml` adds the author url to BlogPosting JSON-LD.
- Removed duplicate schema.org microdata from `_layouts/post.html` (microformats `h-entry` kept).
- `last_modified_at: 2026-10-12` added to the six posts edited in this session; seo-tag emits it as `dateModified`.
- Convention: set `last_modified_at` when a post is substantively updated (add to CLAUDE.md when finalising).

### Point 4 (done)

- Added `## Key takeaways` (after the feature image) to five technical posts: sonarqube, managed identities, client certificates, GitHub Pages migration, Copilot.
- Added an optional `faq:` front matter list (question/answer), rendered by `_includes/faq.html` as a visible section plus FAQPage JSON-LD (verified valid, 2 entities per post).
- Renamed several `##` headings to the question people search for; the in-post anchor to the migration plan was updated.
- Optional front matter fields `last_modified_at` and `faq` to document in CLAUDE.md when finalising.

### Point 5 (done)

- `_plugins/tag_pages.rb` generates `/tags/<slug>/` for tags used by 2+ posts (16 pages), slug overrides for `.net`, `c#`, `asp.net`; exposes `site.tag_index` and `site.tag_urls`.
- `/tags/` index (`tags.md`, `_layouts/tags.html`) lists all tags; single-use tags link to their post. Tag pages use `_layouts/tag.html`.
- Tags are linked under the post title only (author choice); tag pages are in the sitemap automatically.

### Point 6 (done)

- `about.md`: added "Experience and expertise" (Info Support, 10+ years, Senior Software Engineer / Lead Developer / Scrum Master), "What I write about" (category and tag links, all verified) and "Certifications" (7 items, names only).
- ProfilePage/Person JSON-LD with worksFor, sameAs, knowsAbout and hasCredential.
- Left out on purpose: certificate numbers, expiry dates, the expired SpecFlow course and the Anthropic fundamentals course. Re-check the list when certifications change.

### Point 7 (done, file-size part is report only)

- `_plugins/image_attributes.rb` adds `width`/`height` from the file header (PNG, JPEG, GIF, WebP) and `loading="lazy" decoding="async"` to local images. The first image in a post and the first tile on listing pages stay eager; the home hero is never lazy.
- CSS: `.post-content img, .page-content img { height: auto }` keeps aspect ratio.
- Fixed three broken image links found on the way: two pizza images (path said 2023/02, files are in 2023/03) and the browser-prompt screenshot in the client certificates post (now `image-edited.png`).
- Heaviest images (convert yourself, e.g. WebP quality about 80; a tool such as cwebp, Squoosh or sharp): `2026/03/featured-blog-migration.png` 2.1 MB, `2023/06/spin-the-wheel.gif` 1.1 MB (use MP4/WebM or animated WebP), `2023/03/Pizza-1024x483.png` 828 KB, `retrospective-pizza-filled.png` 652 KB, `archive-1024x577.png` 624 KB, `2025/11/banner-1024x534.png` 532 KB, `retrospective-pizza-blank.png` 436 KB, `2023/10/technorama-2023-2.jpg` 312 KB.
- Converting means updating `image:` front matter and body references; `check:post` does not verify that files exist yet.
