#!/usr/bin/env node
// Polish the `lore` field of one or more lore JSON files.
//
// Usage:
//   node scripts/polish-lore.mjs                  # polish all src/data/**/*.json
//   node scripts/polish-lore.mjs path/to/file.json [more.json ...]
//   node scripts/polish-lore.mjs src/data/primarchs
//
// Skips entries whose `id` matches a known-redacted list and any file named
// `index.json` (those are metadata, not lore entries).

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { polishLore } from "./lib/lore-cleaner.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DEFAULT_DIR = resolve(ROOT, "src/data");

const REDACTED_IDS = new Set(["primarch-ii", "primarch-xi"]);

function collectJsonFiles(path) {
  const st = statSync(path);
  if (st.isFile()) return path.endsWith(".json") ? [path] : [];
  const out = [];
  for (const name of readdirSync(path)) {
    if (name === "index.json") continue;
    out.push(...collectJsonFiles(join(path, name)));
  }
  return out;
}

function polishFile(path) {
  const raw = readFileSync(path, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return { path, skipped: "invalid-json" };
  }
  if (typeof data.lore !== "string") return { path, skipped: "no-lore-field" };
  if (data.id && REDACTED_IDS.has(data.id)) return { path, skipped: "redacted" };

  const before = data.lore;
  const after = polishLore(before);
  if (after === before) return { path, unchanged: true, length: before.length };

  data.lore = after;
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  return { path, before: before.length, after: after.length };
}

const args = process.argv.slice(2);
const targets = args.length > 0 ? args.map((p) => resolve(p)) : [DEFAULT_DIR];

const files = targets.flatMap(collectJsonFiles);
if (files.length === 0) {
  console.error("no JSON files found");
  process.exit(1);
}

let changed = 0;
let totalBefore = 0;
let totalAfter = 0;
for (const file of files) {
  const r = polishFile(file);
  const rel = file.startsWith(ROOT) ? file.slice(ROOT.length + 1) : file;
  if (r.skipped) {
    console.log(`skip ${rel} (${r.skipped})`);
  } else if (r.unchanged) {
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
