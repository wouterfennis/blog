# Visual refresh: status and pending work

Branch: `design/visual-refresh`. Goal: lift the look of the site while keeping reading easy and undistracted.

Decisions: indigo accent, system font stacks (sans UI, serif article body), banner kept (with dark variant).

## Done

- [x] Design tokens as CSS variables (accent, surface, border, text, muted, shadows, category tints)
- [x] Dark mode follows the OS and is overridable with a header toggle (saved in `localStorage`)
- [x] Typography: 42rem measure, line height 1.75, serif article body, larger post titles
- [x] Code blocks, inline code, blockquotes, tables, tags restyled for light and dark
- [x] Sticky header with accent rule and active nav item
- [x] Category badges and tinted topic chips
- [x] Post tiles: soft surface, hover lift, 3:2 images, lead tile for an odd number of featured posts
- [x] Post page: category badge, reading-progress bar, "On this page" contents, author card
- [x] Dark banner variant on the home page

## Pending: implementation

- [x] Heading anchors: small `#` link on hover for h2 and h3 in posts
- [x] Category pages: badge-tinted heading and description styling
- [x] Footer: tidy into a quiet single block (remove the repeated site description column on small screens)
- [x] Remove CSS left over from the old topic cards (`home-topics__count`, `home-topics__description`)
- [x] Callout styling: a blockquote starting with **Note**, **Tip**, **Important** or **Warning** becomes a callout (script adds the class)
- [x] Mermaid diagrams re-render in the matching theme when the toggle is used
- [x] Archive, tags and projects pages: consistent rows, muted meta, category badges in the archive
- [ ] Optional: search link in the header
- [x] Smooth transition between light and dark mode (colour fade on toggle click only, off for reduced motion)

## Pending: verification (needs a browser)

- [ ] Home page in light mode: only one banner visible (fix in `_sass/components.scss`)
- [ ] Mobile: header, hamburger menu with the theme toggle, tiles, post page
- [ ] Toggle: switching, reload keeps the choice, no flash of the wrong theme
- [ ] Post with a long code block, a table and a Mermaid diagram in both themes
- [ ] Table of contents placement and highlighting at widths from 1100px up
- [ ] Contrast of muted text and category badges on the surface colour (WCAG AA)
- [ ] Lighthouse thresholds from `lighthouserc.json` (CI runs them on the pull request)

## Pending: housekeeping

- [x] Mention the design tokens and the theme toggle in `CLAUDE.md` under Theme
- [ ] Delete this file when the work is merged
