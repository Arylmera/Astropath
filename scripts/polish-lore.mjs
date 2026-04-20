#!/usr/bin/env node
// Polish lore text files.
//
// Lore is stored as `src/assets/<dataset>/<id>.md` (plain text, `## Heading`
// markers, bullet lists). This script applies the shared cleaner from
// scripts/lib/lore-cleaner.mjs to any file or directory passed in.
//
// Usage:
//   node scripts/polish-lore.mjs                  # polish all src/assets/**/*.md
//   node scripts/polish-lore.mjs path/to/file.md [more.md ...]
//   node scripts/polish-lore.mjs src/assets/primarchs

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { polishLore } from "./lib/lore-cleaner.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DEFAULT_DIR = resolve(ROOT, "src/assets");

function collectMdFiles(path) {
  const st = statSync(path);
  if (st.isFile()) return path.endsWith(".md") ? [path] : [];
  const out = [];
  for (const name of readdirSync(path)) {
    out.push(...collectMdFiles(join(path, name)));
  }
  return out;
}

function polishFile(path) {
  const before = readFileSync(path, "utf8");
  const after = polishLore(before);
  if (after === before) return { path, unchanged: true, length: before.length };
  writeFileSync(path, after + "\n");
  return { path, before: before.length, after: after.length };
}

const args = process.argv.slice(2);
const targets = args.length > 0 ? args.map((p) => resolve(p)) : [DEFAULT_DIR];

const files = targets.flatMap(collectMdFiles);
if (files.length === 0) {
  console.error("no .md files found");
  process.exit(1);
}

let changed = 0;
let totalBefore = 0;
let totalAfter = 0;
for (const file of files) {
  const r = polishFile(file);
  const rel = file.startsWith(ROOT) ? file.slice(ROOT.length + 1) : file;
  if (r.unchanged) {
    totalBefore += r.length;
    totalAfter += r.length;
    console.log(`ok   ${rel} (${r.length})`);
  } else {
    changed++;
    totalBefore += r.before;
    totalAfter += r.after;
    console.log(`fix  ${rel} ${r.before} → ${r.after} (${r.after - r.before})`);
  }
}

console.log(`\n${changed}/${files.length} changed; ${totalBefore} → ${totalAfter} chars`);
