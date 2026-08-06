/**
 * Copies content/blog/images -> public/blog/images before dev and build.
 *
 * Writers keep their pictures beside the posts, in the folder they are already
 * editing on GitHub; Next.js can only serve files under public/. This bridges
 * the two, so nobody has to know that. public/blog/images is generated output
 * and is gitignored — content/blog/images is the only copy anyone edits.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'content', 'blog', 'images');
const destination = path.join(root, 'public', 'blog', 'images');

// A repo with no pictures yet is normal, not an error.
if (!fs.existsSync(source)) {
  fs.rmSync(destination, { recursive: true, force: true });
  process.exit(0);
}

// Wiped rather than merged, so a picture deleted from content/ also disappears
// from the site instead of lingering in a stale public/ copy.
fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination, { recursive: true });

// The folder's own README lives alongside the pictures; it is not one of them.
const IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.avif',
  '.svg',
]);

let copied = 0;
for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
  // Flat by design: posts reference a picture by bare filename, so a
  // subfolder here would produce a name the post has no way to write.
  if (!entry.isFile() || entry.name.startsWith('.')) continue;
  if (!IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) continue;
  fs.copyFileSync(
    path.join(source, entry.name),
    path.join(destination, entry.name)
  );
  copied += 1;
}

console.log(`[blog] copied ${copied} image${copied === 1 ? '' : 's'} to public/blog/images`);
