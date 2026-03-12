---
applyTo: "_posts/**"
---

# Blog Writing Style Guide

This file describes the established writing conventions used across all posts on Wouter Compiles IT.
Use it to verify that new posts are consistent with the existing style before publishing.

## Voice and perspective

- Write in **first-person singular** throughout: "I", "me", "my experience", "I've noticed".
- Address the reader directly in **second person** where appropriate: "you", "your team", "you can".
- Tone is **conversational but professional** — not academic, not casual. Avoid marketing language or hollow superlatives.
- Be **opinionated**. Share what worked, what did not, and why. Avoid sitting on the fence.
- Be **honest about failures and limitations**, not only successes ("This however did not work out as we anticipated").

## Opening paragraph

- The **first paragraph** (before any image or heading) must hook the reader immediately.
- Use one of these opening strategies:
  - **Relatable problem**: place the reader in a scenario they recognise ("You finally managed to get your first SonarQube analysis published...").
  - **Interesting observation or personal reflection**: set context and state why the topic matters to you.
  - **Anecdote**: a concrete real-world event that led to writing the post.
- Do **not** open with a definition, a table of contents, or a generic statement like "In this post I will explain...".

## Feature image placement

- Place the feature image **immediately after the opening paragraph**, before the first `##` heading.
- Use this exact format:

  ```markdown
  ![Featured image for YYYY-MM-DD-slug-from-title]({{ '/assets/images/YYYY/MM/filename.ext' | relative_url }})
  ```

- The alt text must follow the pattern `Featured image for <filename-without-extension>`.

## Heading structure

- Use `##` for top-level sections, `###` for subsections, `####` only when a subsection needs one more level.
- Headings are sentence-case (capitalise only the first word and proper nouns): `## What is Verify?`, not `## What Is Verify?`.
- Do not skip heading levels (e.g. do not jump from `##` to `####`).

## Post structure by type

### Technical/programming posts

1. Opening hook (problem scenario)
2. Feature image
3. Scope section — explicitly state the environment, language, platform, or constraints this post focuses on
4. Explanation / background — what is the concept, why does it matter
5. Practical walkthrough — step-by-step with code samples
6. Conclusion or summary of findings
7. References section

### Scrum / team process posts

1. Opening hook (team scenario or seasonal/relatable context)
2. Feature image
3. Practical sections — concrete advice organised by theme
4. Personal reflection on what works and what does not
5. Conclusion
6. *(References section only if external sources are cited)*

### Conference / event review posts

1. Opening context — why you attended, general impression
2. Feature image
3. One `##` section per major theme or talk cluster
4. Each section: what was presented + your personal takeaway
5. Conclusion

### Series posts

- Title must include the part prefix: `"Part N: Actual Title Here"` (e.g. `"Part 1: My experience with GitHub Copilot in an open-source project"`).
- The opening paragraph must state this is part of a series and what the series covers.

## References section

- Every technical and programming post **must** end with a `## References` section.
- Use an unordered list of markdown links: `- [Link text](url)`.
- Scrum and opinion posts only include References when external sources are explicitly cited.

## Code samples

- All fenced code blocks **must** have a language identifier (` ```csharp `, ` ```yaml `, ` ```bash `, etc.).
- Code comments explain **why**, not what (do not repeat what the code literally does).
- Use realistic, not toy, examples that map to the problems discussed in the post.
- Inline code (backticks) is used for: file names, command names, class/method names, configuration keys, and short snippets.

## Language and punctuation

- Use **British-influenced international English** (the blog author is Dutch): avoid American-only idioms.
- Contractions (`it's`, `you're`, `won't`, `don't`) are acceptable in informal, conversational sentences,
  but avoid them in formal explanatory sentences.
- Use an em dash (—) for asides and parenthetical remarks, or a double dot (..) for a casual trailing aside.
- Use rhetorical questions to engage the reader and create natural transitions between sections.
- Sentences vary in length: short punchy sentences for emphasis, longer sentences for explanation.
  Avoid paragraphs with uniform sentence length.
- Emojis are acceptable sparingly, to reinforce tone in non-technical posts.

## Paragraph length

- Keep paragraphs focused on one idea — three to five sentences is typical.
- Never write a one-sentence paragraph unless it is used deliberately for emphasis.
- Avoid walls of text: break up long explanations into subsections or lists.

## Lists

- Use ordered lists for sequential steps (instructions, processes).
- Use unordered lists for non-ordered items (options, characteristics, considerations).
- Do not use lists just to avoid writing prose — if items are naturally connected, write a sentence instead.

## Images (non-feature)

- Additional images are allowed to illustrate a specific point mid-article.
- Use descriptive alt text that explains what the image shows in context.
- Store images in `assets/images/YYYY/MM/` matching the post date.

## Front matter checklist

Every post must have all of these fields:

```yaml
---
layout: post
title: "Exact title here"
date: YYYY-MM-DD
categories: [Category]
image: /assets/images/YYYY/MM/filename.ext
tags: [tag1, tag2, tag3]
---
```

- `categories` must be exactly one of: `Programming`, `Architecture`, `CI CD`, `Scrum`.
  A post may belong to multiple categories (e.g. `[Architecture, Programming]`).
- `tags` are all lowercase with spaces between words (e.g. `client certificates`, not `ClientCertificates`).
- `image` must point to the same image used as the feature image in the body.

## What to avoid

- **Do not** open with a definition or a meta-statement ("In this post I will...").
- **Do not** end without a conclusion or clear takeaway.
- **Do not** add code blocks without a language identifier.
- **Do not** write a References section with bare URLs — always use a labelled link.
- **Do not** use heading-case for section titles (wrong: `## What Is Client Certificate Authentication?`).
- **Do not** let the post read like official documentation — it must contain personal experience and opinion.
