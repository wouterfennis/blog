// Shrinks heavy PNG/JPEG images under assets/images and updates every reference to them.
// Images used as a post's `image:` front matter (also the social preview) become JPEG, because not every
// social network renders WebP previews. Images only used inside posts become WebP. GIF and SVG are skipped.
// Usage: npm run images:optimize [-- --min-kb 300 --max-width 1600] [-- path/to/image.png ...]
import { readFileSync, readdirSync, statSync, writeFileSync, unlinkSync } from 'node:fs';
import { extname, join, parse } from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? Number(args.splice(i, 2)[1]) : fallback;
};
const minKb = opt('--min-kb', 300);
const maxWidth = opt('--max-width', 1600);

const walk = (dir, out = []) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p.replace(/\\/g, '/'));
  }
  return out;
};

const candidates = (args.length ? args : walk('assets/images'))
  .map((p) => p.replace(/\\/g, '/'))
  .filter((p) => /\.(png|jpe?g)$/i.test(p) && statSync(p).size > minKb * 1024);

const textFiles = ['_posts', '_projects', '_layouts', '_includes', '.']
  .flatMap((d) => (d === '.' ? readdirSync('.').filter((f) => f.endsWith('.md')) : walk(d).filter((f) => /\.(md|html)$/.test(f))));

for (const file of candidates) {
  const publicPath = `/${file}`;
  const isFrontMatterImage = textFiles.some((t) => new RegExp(`^image:\\s*${publicPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'm').test(readFileSync(t, 'utf8')));
  const target = isFrontMatterImage ? 'jpeg' : 'webp';
  const ext = isFrontMatterImage ? '.jpg' : '.webp';
  const outFile = join(parse(file).dir, parse(file).name + ext).replace(/\\/g, '/');
  if (outFile === file) continue;

  const before = statSync(file).size;
  let pipeline = sharp(file).rotate().resize({ width: maxWidth, withoutEnlargement: true });
  if (target === 'jpeg') pipeline = pipeline.flatten({ background: '#ffffff' }).jpeg({ quality: 82, mozjpeg: true });
  else pipeline = pipeline.webp({ quality: 80 });
  await pipeline.toFile(outFile);
  const after = statSync(outFile).size;

  let touched = 0;
  for (const t of textFiles) {
    const text = readFileSync(t, 'utf8');
    if (!text.includes(publicPath)) continue;
    writeFileSync(t, text.replaceAll(publicPath, `/${outFile}`));
    touched += 1;
  }
  unlinkSync(file);
  console.log(`${file} -> ${outFile}: ${Math.round(before / 1024)} KB -> ${Math.round(after / 1024)} KB, ${touched} file(s) updated`);
}

if (!candidates.length) console.log(`No PNG/JPEG over ${minKb} KB.`);
