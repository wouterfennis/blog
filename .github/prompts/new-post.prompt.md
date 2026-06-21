---
description: "Scaffold a complete new blog post file with correct front matter and section skeleton."
name: New Post
argument-hint: "Title, category (Programming/Architecture/CI CD/Scrum), post type (technical/scrum/conference/series), and optional comma-separated tags"
agent: agent
tools: [read, edit]
---

You are scaffolding a new blog post for the Wouter Compiles IT Jekyll blog.

Read [.github/copilot-instructions.md](.github/copilot-instructions.md) and [.github/instructions/writing-style.instructions.md](.github/instructions/writing-style.instructions.md) before creating anything, so you fully understand the file naming, front matter, and section structure requirements.

## What to do

1. **Derive the filename** from the title and today's date:
   - Format: `_posts/YYYY-MM-DD-slug-from-title.md`
   - Today's date: use the current date.
   - Slug: lowercase the title, replace spaces and special characters with hyphens, strip punctuation.
   - Example: title "Client Certificates in ASP.NET" → `_posts/2026-06-21-client-certificates-in-asp-net.md`

2. **Build the front matter** block:
   - `layout: post` (always)
   - `title:` — the exact title as provided, quoted
   - `date:` — today's date (YYYY-MM-DD)
   - `categories:` — one of `[Programming]`, `[Architecture]`, `[CI CD]`, or `[Scrum]` (use `CI CD` without a hyphen)
   - `tags:` — include the provided tags; supplement with 3–5 obvious keyword-rich tags derived from the title and category if none were provided (lowercase only)
   - `description:` — a single sentence ≤160 characters, keyword-rich, written in first-person or direct voice. Leave a TODO comment if you cannot infer a good description from the title alone.
   - `image:` — `TODO: add path e.g. /assets/images/YYYY/MM/filename.jpg` (do not invent a real path)
   - Add `mermaid: true` only if the user explicitly mentioned a diagram.

3. **Write the skeleton body** according to the post type:

   **Technical / Programming post:**
   ```
   <!-- Opening hook: relatable problem, observation, or anecdote. Do NOT start with a definition or "In this post I will...". -->

   ![Featured image for YYYY-MM-DD-slug-from-title](TODO: {{ '/assets/images/YYYY/MM/filename.ext' | relative_url }})

   ## Scope

   <!-- State the environment, language, platform, or constraints this post focuses on. -->

   ## What is [topic]?

   <!-- Explanation and background. Why does it matter? -->

   ## [Practical walkthrough heading]

   <!-- Step-by-step walkthrough with code samples. -->

   ```[language]
   // TODO: add code sample
   ```

   ## Conclusion

   <!-- Summary of findings, what worked, what did not. Be opinionated. -->

   ## References

   - [TODO: add reference](https://example.com)
   ```

   **Scrum / team process post:**
   ```
   <!-- Opening hook: team scenario or seasonal context. -->

   ![Featured image for YYYY-MM-DD-slug-from-title](TODO: {{ '/assets/images/YYYY/MM/filename.ext' | relative_url }})

   ## [Theme 1]

   <!-- Concrete advice. -->

   ## [Theme 2]

   <!-- Concrete advice. -->

   ## Reflection

   <!-- Personal reflection on what works and what does not. -->

   ## Conclusion

   <!-- Wrap up. -->
   ```

   **Conference / event review post:**
   ```
   <!-- Opening context: why you attended, general impression. -->

   ![Featured image for YYYY-MM-DD-slug-from-title](TODO: {{ '/assets/images/YYYY/MM/filename.ext' | relative_url }})

   ## [Talk or theme cluster 1]

   <!-- What was presented + your personal takeaway. -->

   ## [Talk or theme cluster 2]

   <!-- What was presented + your personal takeaway. -->

   ## Conclusion

   <!-- Overall impression and key lessons. -->
   ```

   **Series post:**
   - Title must include the part prefix: `"Part N: Actual Title Here"`
   - Opening paragraph must state this is part of a series and what the series covers.
   - Then use the Technical post skeleton above.

4. **After creating the file**, output a short checklist reminding the author:
   - Replace all `TODO:` placeholders before publishing.
   - Place the actual feature image in `assets/images/YYYY/MM/` and update the `image:` front matter field and the inline image path.
   - Run `npm run lint:md` before committing.
   - Commit with `feat: add post about <topic>` to trigger a minor version bump.
