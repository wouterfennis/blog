// Crawls the built site (default: _site) and reports SEO and link problems. Prints only findings.
// Usage: bundle exec jekyll build && npm run check:site [-- _site]   (exit 1 when findings exist)
//
// Checks: broken internal links and assets, missing #anchors, og:image targets, sitemap URLs,
// title / description / canonical / exactly one <h1>, duplicate titles, invalid JSON-LD,
// and the presence of robots.txt, sitemap.xml, feed.xml and llms.txt.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] ?? '_site';
const siteUrl = 'https://woutercompiles.it';

if (!existsSync(root)) {
  console.error(`${root} not found. Build the site first: bundle exec jekyll build`);
  process.exit(2);
}

const htmlFiles = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) htmlFiles.push(path);
  }
})(root);

// Case-sensitive on every OS: GitHub Pages serves from a case-sensitive file system, Windows and macOS do not.
const existsExact = (relative) => {
  let current = root;
  for (const part of relative.split('/').filter(Boolean)) {
    if (!statSync(current).isDirectory() || !readdirSync(current).includes(part)) return false;
    current = join(current, part);
  }
  return true;
};

const resolves = (url) => {
  const clean = decodeURIComponent(url.split('#')[0].split('?')[0]);
  if (!clean) return true;
  if (!existsExact(clean)) return false;
  return statSync(join(root, clean)).isFile() || existsExact(`${clean}/index.html`);
};
const local = (url) => (url.startsWith(siteUrl) ? url.slice(siteUrl.length) || '/' : url);

const issues = [];
const titles = new Map();
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const page = `/${file.replace(/\\/g, '/').slice(root.length + 1).replace(/index\.html$/, '')}`;
  if (page === '/404.html') continue;

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) issues.push(`${page}: no <title>`);
  else titles.set(title, [...(titles.get(title) ?? []), page]);
  if (!/<meta name="description"|<meta property="og:description"/.test(html)) issues.push(`${page}: no description`);
  if (!/<link rel="canonical"/.test(html)) issues.push(`${page}: no canonical`);
  const h1s = (html.match(/<h1\b/g) ?? []).length;
  if (h1s !== 1) issues.push(`${page}: ${h1s} <h1> elements (want 1)`);

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { issues.push(`${page}: invalid JSON-LD`); }
  }

  for (const m of html.matchAll(/<meta property="og:image" content="([^"]+)"/g)) {
    checked += 1;
    if (m[1].startsWith(siteUrl) && !resolves(local(m[1]))) issues.push(`${page}: og:image target missing ${m[1]}`);
  }

  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(mailto:|tel:|data:|#|\/\/)/.test(url)) continue;
    if (/^https?:/.test(url) && !url.startsWith(siteUrl)) continue;
    checked += 1;
    const target = local(url);
    if (target.startsWith('/') && !resolves(target)) issues.push(`${page}: broken link or asset ${url}`);
  }

  for (const m of html.matchAll(/href="#([^"]+)"/g)) {
    if (!html.includes(`id="${m[1]}"`)) issues.push(`${page}: missing anchor #${m[1]}`);
  }
}

for (const [title, pages] of titles) {
  if (pages.length > 1) issues.push(`duplicate title "${title}": ${pages.join(', ')}`);
}

for (const required of ['robots.txt', 'sitemap.xml', 'feed.xml', 'llms.txt', 'llms-full.txt']) {
  if (!existsSync(join(root, required))) issues.push(`missing ${required}`);
}

const sitemapPath = join(root, 'sitemap.xml');
if (existsSync(sitemapPath)) {
  for (const m of readFileSync(sitemapPath, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
    checked += 1;
    if (!m[1].startsWith(siteUrl)) issues.push(`sitemap: URL on another host ${m[1]}`);
    else if (!resolves(local(m[1]))) issues.push(`sitemap: URL not in the build ${m[1]}`);
  }
}

if (issues.length) {
  console.log(`${issues.length} finding(s) in ${htmlFiles.length} pages (${checked} links, assets and URLs checked)`);
  issues.forEach((i) => console.log(`- ${i}`));
  process.exit(1);
}
console.log(`OK: ${htmlFiles.length} pages, ${checked} links, assets and URLs checked`);
