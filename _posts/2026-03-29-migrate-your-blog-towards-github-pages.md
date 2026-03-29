---
layout: post
title: "Migrate your blog towards GitHub Pages"
date: 2026-03-29
categories: [CI CD, Programming]
image: /assets/images/2026/03/banner.png
description: "A practical guide to migrating a self-hosted blog to GitHub Pages using Jekyll, covering the decisions, challenges, and lessons learned along the way."
tags: [blog, ci cd, deployment, github actions, github pages, jekyll, migration, static site]
---

Running WordPress for a personal blog always felt like overkill. My site is mostly static — I write a new post, add some metadata, and hit publish. Yet there I was, managing a full CMS, keeping plugins up to date, and paying for hosting that did far more than I ever needed. One morning it struck me: could a free, Git-based hosting service like GitHub Pages give my readers the exact same result with far less overhead?

![Featured image for 2026-03-29-migrate-your-blog-towards-github-pages]({{ '/assets/images/2026/03/banner.png' | relative_url }})

## Why GitHub Pages?

I came across GitHub Pages(TODO: Add link) a couple of times before. It offers a hosting service for static websites. You provide the source code for the website yourself, whether you write the HTML directly or generate it through a build process. It looked like exactly what I needed.

- It offers a free hosting model.
- The site is maintained using a Git-based workflow. You update the repository, the website is updated accordingly.
- No server or CMS maintenance — the Git repository is the only thing to maintain.

Would the migration be straightforward? Would it be lighter and cheaper? And how would I preserve all my existing content in the process?

## The migration plan

In a customer production scenario, the migration would normally be a very technical and deterministic exercise. An existing CMS would have a database containing all the articles and content. A process or pipeline would be sketched out to extract the data and funnel it into the new format for GitHub Pages. It would be thoroughly tested and signed off before switching to the new hosting service and going live.

In my case, it is my own blog, so I can do a bit more experimenting and take a bit more risk when it comes to the deterministic side of things.
**I want to use GitHub Copilot to do the migration.**
I don't mean building a deterministic pipeline with Copilot. I mean Copilot itself crawling my existing website, gathering the data and building up the Git repository locally — in a sense, reverse-engineering my blog.


## Setting up Jekyll

TODO: Walk through initialising a Jekyll project locally, choosing a theme, and configuring `_config.yml` for the correct permalink structure.

## Migrating content

TODO: Cover exporting posts from the previous platform, converting them to Markdown front matter format, and preserving URLs.

## Configuring GitHub Actions

TODO: Show the `deploy.yml` workflow that builds the Jekyll site and publishes to GitHub Pages on every push to `main`.

```yaml
# TODO: paste deploy workflow here
```

## Challenges and surprises

TODO: Honest account of what did not go smoothly — plugin restrictions, asset paths, DNS cutover, etc.

## Conclusion

TODO: Wrap up with the net result and whether the migration was worth the effort.

## References

- [GitHub Pages documentation](https://docs.github.com/en/pages)
- [Jekyll documentation](https://jekyllrb.com/docs/)
