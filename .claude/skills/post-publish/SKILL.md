---
name: post-publish
description: "Draft the promotion material for a published post: a LinkedIn post, dev.to front matter with a canonical URL, and the Search Console indexing step."
argument-hint: "Path or slug of the post (e.g. _posts/2026-03-29-migrate-your-blog-towards-github-pages.md)"
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(npm run posts:index)
---

You help the author of the Wouter Compiles IT blog promote a post that is live (or about to go live). Post: $ARGUMENTS

Do not create or edit any file. The output below is the only deliverable.

## Read as little as possible

- Resolve the post path with Glob if only a slug was given.
- Read only the first 40 lines of the post (front matter, opening hook, feature image). Do not read the whole post.
- Run `npm run posts:index` only if you want to suggest a related post to link in a follow-up comment.

## Derive

- **Canonical URL:** `https://woutercompiles.it/YYYY/MM/DD/slug/`, from the filename date and slug (the permalink pattern in `CLAUDE.md`).
- **Title, description, tags:** from the front matter.

## Output

### 1. LinkedIn post

- Max 120 words, first-person singular, conversational but professional, no hollow superlatives.
- Open with the hook (a relatable problem or an honest observation), not with "I wrote a new blog post".
- One concrete takeaway, then the canonical URL on its own line.
- 3 to 5 hashtags derived from the tags (CamelCase, no spaces, e.g. `#GitHubCopilot`).
- Follow `.claude/rules/language.md` (British-influenced English, Dutch-interference watchlist).

### 2. dev.to cross-post front matter

```yaml
---
title: "<post title>"
published: false
description: "<post description>"
tags: <up to 4 lowercase tags without spaces, comma-separated>
canonical_url: <canonical URL>
cover_image: https://woutercompiles.it<image path from front matter>
---
```

Remind the author that dev.to needs the body pasted as Markdown, that image paths in the body must be made absolute (`https://woutercompiles.it/assets/...`), and that `canonical_url` is what keeps the blog as the primary source for search engines.

### 3. Indexing checklist

- Open Google Search Console, run URL Inspection on the canonical URL and click Request indexing.
- Do the same in Bing Webmaster Tools.
- Confirm the post appears in `https://woutercompiles.it/sitemap.xml` and `https://woutercompiles.it/llms.txt`.

Keep the whole answer short. No explanations beyond what is listed above.
