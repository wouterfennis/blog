// Deterministic pre-publish checks for one post. Prints only findings.
// Usage: npm run check:post -- _posts/YYYY-MM-DD-slug.md   (exit 1 when findings exist)
import { basename } from 'node:path';
import { readPost } from './lib.mjs';

const path = process.argv[2];
if (!path) {
  console.error('Usage: npm run check:post -- <path-to-post>');
  process.exit(2);
}

const { fm, body, hasFrontMatter } = readPost(path);
const name = basename(path).replace(/\.md$/, '');
const findings = [];
const add = (msg) => findings.push(msg);

if (!hasFrontMatter) add('front matter: missing');
if (fm.layout !== 'post') add('front matter: layout must be "post"');
if (!fm.title) add('front matter: title missing');
if (String(fm.date ?? '') !== name.slice(0, 10)) add(`front matter: date "${fm.date}" does not match filename`);

const allowed = ['Programming', 'Architecture', 'CI CD', 'Scrum'];
const cats = [].concat(fm.categories ?? []);
if (!cats.length) add('front matter: categories missing');
for (const c of cats) if (!allowed.includes(c)) add(`front matter: unknown category "${c}"`);

const tags = [].concat(fm.tags ?? []);
if (tags.length < 4 || tags.length > 8) add(`front matter: ${tags.length} tags (want 4-8)`);
for (const t of tags) if (t !== t.toLowerCase()) add(`front matter: tag "${t}" is not lowercase`);

if (!fm.description) add('front matter: description missing');
else if (fm.description.length > 160) add(`front matter: description is ${fm.description.length} chars (max 160)`);

if (!fm.image) add('front matter: image missing');

const lines = body.split('\n');
let inFence = false;
let fenceStart = 0;
let hasMermaid = false;
let prevLevel = 1;
let hasFeature = false;
let firstH2Seen = false;
let hasReferences = false;

lines.forEach((line, i) => {
  const n = i + 1;
  const fence = line.match(/^\s*```(\S*)/);
  if (fence) {
    if (!inFence) {
      inFence = true;
      fenceStart = n;
      if (!fence[1]) add(`line ${n}: code block without language`);
      if (fence[1] === 'mermaid') hasMermaid = true;
    } else {
      inFence = false;
    }
    return;
  }
  if (inFence) return;

  const img = line.match(/!\[([^\]]*)\]\(([^)]*)\)/);
  if (img) {
    if (!img[1].trim()) add(`line ${n}: image without alt text`);
    if (!firstH2Seen && !hasFeature) {
      hasFeature = true;
      if (!img[1].startsWith('Featured image for ')) add(`line ${n}: feature alt text must start with "Featured image for "`);
      else if (img[1] !== `Featured image for ${name}`) add(`line ${n}: feature alt text should be "Featured image for ${name}"`);
      if (!img[2].includes('relative_url')) add(`line ${n}: feature image should use the relative_url filter`);
    }
  }

  const h = line.match(/^(#{1,6})\s+(.*)$/);
  if (!h) return;
  const level = h[1].length;
  const text = h[2].trim();
  if (level === 1) add(`line ${n}: H1 not allowed in body`);
  if (level === 2) firstH2Seen = true;
  if (level > prevLevel + 1) add(`line ${n}: heading level skipped (H${prevLevel} -> H${level})`);
  prevLevel = level;
  if (/^references$/i.test(text) && level === 2) hasReferences = true;
  const words = text.split(/\s+/).slice(1);
  const capped = words.filter((w) => /^[A-Z][a-z]{2,}$/.test(w));
  if (capped.length >= 2) add(`line ${n}: heading may not be sentence-case (${capped.join(', ')}); ignore if proper nouns`);
});

if (inFence) add(`line ${fenceStart}: unclosed code block`);
if (!hasFeature) add('body: no feature image before first ## heading');
if (hasMermaid && fm.mermaid !== 'true') add('front matter: body has mermaid block but mermaid: true is missing');
if (!hasMermaid && fm.mermaid === 'true') add('front matter: mermaid: true set but body has no mermaid block');
if (!hasReferences && !cats.includes('Scrum')) add('body: no "## References" section (required for non-Scrum posts)');

const first = body.split('\n').find((l) => l.trim());
if (first && /^(in this (post|article)|this (post|article))\b/i.test(first.trim())) add('opening: starts with "In this post..." style phrasing');

if (findings.length) {
  console.log(`${path}: ${findings.length} finding(s)`);
  findings.forEach((f) => console.log(`- ${f}`));
  process.exit(1);
}
console.log(`${path}: OK`);
