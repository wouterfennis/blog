// Shared helpers for the blog scripts: minimal front matter parsing, no dependencies.
import { readFileSync } from 'node:fs';

export function readPost(path) {
  const text = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { fm: {}, body: text, hasFrontMatter: false };
  const fm = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*?)\s*(\s#.*)?$/);
    if (!kv) continue;
    let value = kv[2];
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
    } else {
      value = value.replace(/^"(.*)"$/, '$1');
    }
    fm[kv[1]] = value;
  }
  return { fm, body: match[2], hasFrontMatter: true };
}
