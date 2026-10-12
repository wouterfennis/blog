---
name: new-post
description: "Scaffold a complete new blog post file with correct front matter and section skeleton."
argument-hint: "Title, category (Programming/Architecture/CI CD/Scrum), post type (technical/scrum/conference/series), and optional comma-separated tags"
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Bash(date *)
---

Scaffold a new blog post for the Wouter Compiles IT Jekyll blog.

User input: $ARGUMENTS

Read `.claude/rules/writing-style.md` before creating anything. The front matter schema and file naming are in `CLAUDE.md`, which is already in your context. If the category or post type is missing from the input, infer it from the title and say what you chose.

## Steps

1. **Derive the filename** as `_posts/YYYY-MM-DD-slug-from-title.md`.
   - Get today's date with `date +%F`.
   - Slug: lowercase the title, replace spaces and special characters with hyphens, strip punctuation.
   - Example: title "Client Certificates in ASP.NET" gives `_posts/2026-06-21-client-certificates-in-asp-net.md`.

2. **Build the front matter** following the schema in `CLAUDE.md`:
   - `title` is the exact title as provided, quoted.
   - `tags`: use the provided tags; otherwise derive 4-6 lowercase keyword-rich tags from the title and category.
   - `description`: one or two sentences, at most 160 characters, keyword-rich. If you cannot infer a good one, write your best attempt and add `<!-- TODO: refine description -->` after the front matter.
   - `image`: do not invent a path. Leave the field out and put `<!-- TODO: add image: front matter, e.g. /assets/images/YYYY/MM/filename.jpg -->` directly after the front matter. This keeps the front matter valid YAML.
   - Add `mermaid: true` only if the user mentioned a diagram.

3. **Write the skeleton body** for the post type. Use HTML comments for every placeholder so nothing broken can reach the published site. The feature image line is written complete (it is valid Liquid even before the file exists), followed by a TODO comment.

   **Technical / programming post**

   ````markdown
   <!-- TODO: opening hook — relatable problem, observation or anecdote. Never start with a definition or "In this post I will...". -->

   ![Featured image for YYYY-MM-DD-slug-from-title]({{ '/assets/images/YYYY/MM/filename.ext' | relative_url }})
   <!-- TODO: add the image file and make it match the image: front matter -->

   ## Scope

   <!-- State the environment, language, platform or constraints this post focuses on. -->

   ## What is [topic]?

   <!-- Explanation and background. Why does it matter? -->

   ## [Practical walkthrough heading]

   <!-- Step-by-step walkthrough with realistic code samples. Every code block needs a language identifier. -->

   ## Conclusion

   <!-- Summary of findings, what worked, what did not. Be opinionated. -->

   ## References

   <!-- TODO: add references as labelled links: - [Link text](url) -->
   ````

   **Scrum / team process post**

   ````markdown
   <!-- TODO: opening hook — team scenario or seasonal context. -->

   ![Featured image for YYYY-MM-DD-slug-from-title]({{ '/assets/images/YYYY/MM/filename.ext' | relative_url }})
   <!-- TODO: add the image file -->

   ## [Theme 1]

   <!-- Concrete advice. -->

   ## [Theme 2]

   <!-- Concrete advice. -->

   ## Reflection

   <!-- What works and what does not, honestly. -->

   ## Conclusion

   <!-- Wrap up with a clear takeaway. -->
   ````

   **Conference / event review post**

   ````markdown
   <!-- TODO: opening context — why you attended, general impression. -->

   ![Featured image for YYYY-MM-DD-slug-from-title]({{ '/assets/images/YYYY/MM/filename.ext' | relative_url }})
   <!-- TODO: add the image file -->

   ## [Talk or theme cluster 1]

   <!-- What was presented + your personal takeaway. -->

   ## [Talk or theme cluster 2]

   <!-- What was presented + your personal takeaway. -->

   ## Conclusion

   <!-- Overall impression and key lessons. -->
   ````

   **Series post**: the title must start with `Part N:`, and the opening paragraph must say it is part of a series and what the series covers. Use the technical skeleton.

4. **Lint**: a hook runs markdownlint automatically after the file is written; fix anything it reports.

5. **Finish with a short checklist** for the author:
   - Resolve every `TODO` comment before publishing.
   - Put the feature image in `assets/images/YYYY/MM/` and add the `image:` front matter field.
   - Run the `pre-publish-reviewer` agent on the finished post.
   - Commit with `feat: add post about <topic>` to trigger a minor version bump.
