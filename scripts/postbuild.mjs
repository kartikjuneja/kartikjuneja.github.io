/**
 * Copies index.html to 404.html after Vite build for GitHub Pages SPA fallback.
 * History API deep links resolve to 404.html, which loads the same app shell.
 */
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
const index = resolve(dist, 'index.html');
const fallback = resolve(dist, '404.html');

if (!existsSync(index)) {
  console.error('postbuild: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

copyFileSync(index, fallback);
console.log('postbuild: wrote dist/404.html for GitHub Pages History API fallback');
