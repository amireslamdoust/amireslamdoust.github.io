#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targets = [
  path.join(root, 'src'),
  path.join(root, 'public'),
  path.join(root, 'README.md'),
];

const forbiddenNames = [/let'?s join/i, /togethina/i, /partyro/i];
const forbiddenPatterns = [
  { name: 'tel: link', re: /tel:/i },
  { name: 'German mobile', re: /\+49\s*\d/ },
  { name: 'MSc claim', re: /\bM\.?Sc\b|\bMaster of Science\b/i },
];

const textExt = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.js',
  '.mjs',
  '.css',
  '.md',
  '.mdx',
  '.svg',
  '.xml',
  '.txt',
  '.html',
  '.json',
]);

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else if (textExt.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

const files = [];
for (const target of targets) {
  try {
    const statEntries = await readdir(target, { withFileTypes: true }).catch(() => null);
    if (!statEntries) {
      // file path
      files.push(target);
      continue;
    }
    await walk(target, files);
  } catch {
    // ignore missing
  }
}

let failed = false;
const warnings = [];

for (const file of files) {
  if (file.endsWith('.pdf')) continue;
  let text;
  try {
    text = await readFile(file, 'utf8');
  } catch {
    continue;
  }

  const isPolicySource =
    file.includes('lint-content.mjs') ||
    file.includes('forbidden-content.ts') ||
    file.includes('forbidden-content.test.ts');

  for (const re of forbiddenNames) {
    if (re.test(text)) {
      if (isPolicySource) continue;
      console.error(`FAIL ${path.relative(root, file)}: forbidden product name (${re})`);
      failed = true;
    }
  }

  for (const pattern of forbiddenPatterns) {
    if (pattern.re.test(text)) {
      if (isPolicySource) continue;
      console.error(`FAIL ${path.relative(root, file)}: ${pattern.name}`);
      failed = true;
    }
  }

  if (/\[ADD METRIC\]/.test(text) && !file.includes('.md')) {
    warnings.push(`WARN ${path.relative(root, file)}: leftover [ADD METRIC]`);
  }
}

for (const warning of warnings) console.warn(warning);

if (failed) {
  console.error('\nContent lint failed.');
  process.exit(1);
}

console.log(`Content lint passed (${files.length} files scanned).`);
