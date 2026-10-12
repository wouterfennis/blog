// Prints one compact line per post: date | categories | title | tags.
// Usage: npm run posts:index
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { readPost } from './lib.mjs';

const dir = '_posts';
for (const file of readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
  const { fm } = readPost(join(dir, file));
  const cats = [].concat(fm.categories ?? []).join('/');
  const tags = [].concat(fm.tags ?? []).join(', ');
  console.log(`${file.replace(/\.md$/, '')} | ${cats} | ${fm.title ?? '?'} | ${tags}`);
}
