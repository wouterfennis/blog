# SEO and GEO architecture

How this blog is made discoverable for search engines (SEO) and AI answer engines (GEO), and the rules to keep it that way.
Written so that a contributor or a coding agent does not have to rediscover it. Background: issue #54.

## Principles

- One problem, not two: clear structure, honest metadata and first-hand content help both search engines and AI systems.
- No tricks: no keyword stuffing, no hidden text, no structured data that is not backed by visible content.
- Keep it simple: prefer a template or a short script over tooling.
- Never break URLs: permalinks are `/:year/:month/:day/:title/`, tag pages live under `/tags/`, existing URLs do not change.

## Information architecture

```text
Home
├── Featured articles (front matter `featured: true`)
├── Topics (the four categories with post counts)
├── Category pages /category/<slug>/   Programming, Architecture, CI CD, Scrum
├── Tag pages /tags/<slug>/            only tags used by 2+ posts; /tags/ lists all
├── Posts                              breadcrumb: Home > first category > post
├── Projects /projects/<name>/         one tile per project
└── About /about/                      author and entity page
```

Not built yet: topic or pillar pages, and links between projects and articles.

## Metadata and canonical URLs

- `jekyll-seo-tag` (in `_includes/head.html`) emits title, description, canonical URL, Open Graph and Twitter tags.
  The site URL is `https://woutercompiles.it` (`_config.yml`), so canonicals use HTTPS and the correct host.
- Each page needs a unique title, a description of at most 160 characters, exactly one `<h1>` and a canonical link.
  `npm run check:site` verifies this for the built site.
- The `image:` front matter is the social preview. Images used there are JPEG, because not every social network renders WebP previews.
- Titles are sentence-case and state the subject. Descriptions are not a copy of the opening paragraph.

## Structured data (JSON-LD)

| Page | Types | Source |
|---|---|---|
| All pages | `WebSite`, `Person` (with `sameAs`) | `jekyll-seo-tag`, `social:` in `_config.yml` |
| Posts | `BlogPosting` (author, publisher, dates, `articleSection`) | `jekyll-seo-tag`, extended by `_plugins/post_structured_data.rb`; author URL from `_data/authors.yml` |
| Posts, category pages, tag pages | `BreadcrumbList` | `_includes/breadcrumbs.html` (same data as the visible breadcrumbs) |
| Posts with `faq:` | `FAQPage` | `_includes/faq.html` (same data as the visible FAQ section) |
| About | `ProfilePage` with `Person`, `worksFor`, `hasCredential` | JSON-LD block in `about.md` |

Rule: the visible content and the JSON-LD come from the same data, so they cannot drift apart.

## Author and entity

- The canonical name, titles, bio and consistency rules are in `docs/identity.md`. Update that file first when something changes.
- Every post has an author (default `Wouter Fennis`) that links to `/about/` in structured data.
- External profiles (LinkedIn, GitHub) are linked from the About page and from `sameAs`. Certification verification links are still to be added.

## Discovery files

| File | Purpose |
|---|---|
| `robots.txt` | Crawler policy: search and answer bots allowed, bulk training crawlers blocked |
| `sitemap.xml` | `jekyll-sitemap`; contains posts, categories, tags, projects and pages (not 404 or the llms files) |
| `feed.xml` | `jekyll-feed`, full content, advertised in the page head |
| `llms.txt` | Generated from the site by `llms.txt` (Liquid): key pages, categories and the 10 latest posts |
| `llms-full.txt` | Generated; the full Markdown of every post, using `_plugins/raw_markdown.rb` |

## Content structure

- Every post has `## Key takeaways` directly before the first section and a `faq:` list with two questions answered from the post itself.
- Technical posts end with `## References`.
- Related posts (3, by shared tags then category) appear under each post (`_includes/related-posts.html`), and tags link to tag pages.
- When a post is substantively updated, set `last_modified_at: YYYY-MM-DD`. It becomes `dateModified` and the visible "Updated" date. Never change `date` to make a post look new.
- Link related posts to each other in the text with descriptive anchor text, not "click here".

## Images and performance

- `_plugins/image_attributes.rb` adds `width`, `height`, `loading="lazy"` and `decoding="async"` to local images (the first image of a post stays eager).
- `npm run images:optimize` converts PNG and JPEG files over 300 KB and rewrites references. Run it after adding large images.
- Every meaningful image has descriptive alt text; the feature image alt text is `Featured image for <slug>`.
- Lighthouse CI runs on pull requests (`lighthouserc.json`): performance 0.8, accessibility 0.95, best practices 0.9, SEO 0.95.
- GitHub Pages sets cache headers (10 minutes) and cannot be changed.

## Accessibility

Skip link, visible focus outlines, WCAG AA colour contrast (`$grey-color`, `$brand-color` and syntax tokens in `assets/main.scss`), keyboard-focusable code blocks and `lang="en"` are in place. Do not lower the text contrast again when changing styles.

## Validation

| Check | Command | When |
|---|---|---|
| Markdown | `npm run lint:md` | After every Markdown edit (hook) and in CI |
| One post | `npm run check:post -- _posts/<file>.md` | Before publishing; CI on changed posts |
| Built site | `bundle exec jekyll build && npm run check:site` | Locally and in CI |
| Lighthouse | `npx @lhci/cli autorun --config=lighthouserc.json` | CI; locally with `CHROME_PATH` set |

CI is `.github/workflows/site-checks.yml` (pull requests) and `.github/workflows/deploy.yml` (deployment from `main`).
The custom plugins in `_plugins/` only run because the site is built with `bundle exec jekyll build` in GitHub Actions, not with the built-in Pages build.

## How to add a new article

1. Scaffold it with `/new-post`, or create `_posts/YYYY-MM-DD-slug.md` with the front matter from `CLAUDE.md`.
2. Write the post in first person with real experience. The first paragraph hooks the reader and contains the main keyword.
3. Put the feature image directly after the opening paragraph:
   `![Featured image for <slug>]({{ '/assets/images/YYYY/MM/file.jpg' | relative_url }})`, and use the same file as `image:` in the front matter.
4. Add `## Key takeaways` (3 to 5 bullets with the real conclusions) before the first `##` section.
5. Use descriptive, sentence-case headings, with at least one that states the question or topic.
6. Add 2 questions to `faq:` in the front matter, answered from the post.
7. Add `## References` for technical posts, and link 1 to 3 related posts in the text.
8. Check images: run `npm run images:optimize` if any file is over 300 KB, and give every image alt text.
9. Run `npm run check:post -- <file>`, then the `pre-publish-reviewer` agent, then `npm run lint:md`.
10. Build with `bundle exec jekyll build` and run `npm run check:site`.
11. Commit with `feat:` for a new post. After publishing, use `/post-publish` for the LinkedIn text, dev.to canonical front matter and the Search Console step.
