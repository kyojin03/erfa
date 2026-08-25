import { build } from 'esbuild';
import { mkdir, copyFile } from 'node:fs/promises';

await mkdir('dist', { recursive: true });
await build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/Code.js',
  bundle: true,
  format: 'iife',
  platform: 'neutral',
  target: 'es2021',
  legalComments: 'none',
  minify: false
});
await copyFile('appsscript.json', 'dist/appsscript.json');
