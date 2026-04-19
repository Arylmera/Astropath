import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { polishLore } from "./lib/lore-cleaner.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../src/data/space-marines");

const API = "https://warhammer40k.fandom.com/api.php";

const ENTRIES = [
  // First Founding loyalist Legions / successor Chapters
  { id: "dark-angels",       founding: "First",  legionNumber: "I",    primarch: "Lion El'Jonson",   allegiance: "Loyalist", title: "Dark Angels",       page: "Dark_Angels" },
  { id: "white-scars",       founding: "First",  legionNumber: "V",    primarch: "Jaghatai Khan",    allegiance: "Loyalist", title: "White Scars",       page: "White_Scars" },
  { id: "space-wolves",      founding: "First",  legionNumber: "VI",   primarch: "Leman Russ",       allegiance: "Loyalist", title: "Space Wolves",      page: "Space_Wolves" },
  { id: "imperial-fists",    founding: "First",  legionNumber: "VII",  primarch: "Rogal Dorn",       allegiance: "Loyalist", title: "Imperial Fists",    page: "Imperial_Fists" },
  { id: "blood-angels",      founding: "First",  legionNumber: "IX",   primarch: "Sanguinius",       allegiance: "Loyalist", title: "Blood Angels",      page: "Blood_Angels" },
  { id: "iron-hands",        founding: "First",  legionNumber: "X",    primarch: "Ferrus Manus",     allegiance: "Loyalist", title: "Iron Hands",        page: "Iron_Hands" },
  { id: "ultramarines",      founding: "First",  legionNumber: "XIII", primarch: "Roboute Guilliman",allegiance: "Loyalist", title: "Ultramarines",      page: "Ultramarines" },
  { id: "salamanders",       founding: "First",  legionNumber: "XVIII",primarch: "Vulkan",           allegiance: "Loyalist", title: "Salamanders",       page: "Salamanders" },
  { id: "raven-guard",       founding: "First",  legionNumber: "XIX",  primarch: "Corvus Corax",     allegiance: "Loyalist", title: "Raven Guard",       page: "Raven_Guard" },

  // First Founding traitor Legions
  { id: "emperors-children", founding: "First",  legionNumber: "III",  primarch: "Fulgrim",          allegiance: "Traitor",  title: "Emperor's Children",page: "Emperor's_Children" },
  { id: "iron-warriors",     founding: "First",  legionNumber: "IV",   primarch: "Perturabo",        allegiance: "Traitor",  title: "Iron Warriors",     page: "Iron_Warriors" },
  { id: "night-lords",       founding: "First",  legionNumber: "VIII", primarch: "Konrad Curze",     allegiance: "Traitor",  title: "Night Lords",       page: "Night_Lords" },
  { id: "world-eaters",      founding: "First",  legionNumber: "XII",  primarch: "Angron",           allegiance: "Traitor",  title: "World Eaters",      page: "World_Eaters" },
  { id: "death-guard",       founding: "First",  legionNumber: "XIV",  primarch: "Mortarion",        allegiance: "Traitor",  title: "Death Guard",       page: "Death_Guard" },
  { id: "thousand-sons",     founding: "First",  legionNumber: "XV",   primarch: "Magnus the Red",   allegiance: "Traitor",  title: "Thousand Sons",     page: "Thousand_Sons" },
  { id: "sons-of-horus",     founding: "First",  legionNumber: "XVI",  primarch: "Horus Lupercal",   allegiance: "Traitor",  title: "Sons of Horus",     page: "Sons_of_Horus" },
  { id: "word-bearers",      founding: "First",  legionNumber: "XVII", primarch: "Lorgar Aurelian",  allegiance: "Traitor",  title: "Word Bearers",      page: "Word_Bearers" },
  { id: "alpha-legion",      founding: "First",  legionNumber: "XX",   primarch: "Alpharius Omegon", allegiance: "Traitor",  title: "Alpha Legion",      page: "Alpha_Legion" },

  // Notable successors / specialist chapters
  { id: "black-templars",    founding: "Second", legionNumber: null,   primarch: "Rogal Dorn",       allegiance: "Loyalist", title: "Black Templars",    page: "Black_Templars" },
  { id: "crimson-fists",     founding: "Second", legionNumber: null,   primarch: "Rogal Dorn",       allegiance: "Loyalist", title: "Crimson Fists",     page: "Crimson_Fists" },
  { id: "grey-knights",      founding: "Unknown",legionNumber: null,   primarch: "The Emperor",      allegiance: "Loyalist", title: "Grey Knights",      page: "Grey_Knights" },
  { id: "deathwatch",        founding: "N/A",    legionNumber: null,   primarch: "Various",          allegiance: "Loyalist", title: "Deathwatch",        page: "Deathwatch" },
  { id: "blood-ravens",      founding: "Unknown",legionNumber: null,   primarch: "Unknown",          allegiance: "Loyalist", title: "Blood Ravens",      page: "Blood_Ravens" },
  { id: "flesh-tearers",     founding: "Second", legionNumber: null,   primarch: "Sanguinius",       allegiance: "Loyalist", title: "Flesh Tearers",     page: "Flesh_Tearers" },
  { id: "exorcists",         founding: "Unknown",legionNumber: null,   primarch: "Unknown",          allegiance: "Loyalist", title: "Exorcists",         page: "Exorcists" },
  { id: "minotaurs",         founding: "Unknown",legionNumber: null,   primarch: "Unknown",          allegiance: "Loyalist", title: "Minotaurs",         page: "Minotaurs" },
];

function stripWikitext(s) {
  let t = s;
  for (let i = 0; i < 8; i++) t = t.replace(/\{\{[^{}]*\}\}/g, "");
  t = t.replace(/\[\[(?:File|Image):[^\]]*\]\]/gi, "");
  t = t.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2");
  t = t.replace(/\[\[([^\]]+)\]\]/g, "$1");
  t = t.replace(/<ref[^>]*\/>/g, "");
  t = t.replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, "");
  t = t.replace(/<[^>]+>/g, "");
  t = t.replace(/'{2,5}/g, "");
  t = t.replace(/\{\|[\s\S]*?\|\}/g, "");
  t = t.replace(/^=+\s*(.+?)\s*=+\s*$/gm, "\n## $1\n");
  t = t.replace(/\n{3,}/g, "\n\n").trim();
  return t;
}

async function fetchPage(page) {
  const url = `${API}?action=parse&page=${encodeURIComponent(page)}&format=json&prop=wikitext&redirects=1`;
  const res = await fetch(url, { headers: { "User-Agent": "astropath-lore-fetch/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${page}`);
  const json = await res.json();
  if (json.error) throw new Error(`API error for ${page}: ${json.error.info}`);
  return json.parse?.wikitext?.["*"] ?? "";
}

const out = [];

for (const e of ENTRIES) {
  process.stdout.write(`fetching ${e.title}... `);
  try {
    const raw = await fetchPage(e.page);
    const lore = polishLore(stripWikitext(raw));
    out.push({ ...e, source: `https://warhammer40k.fandom.com/wiki/${e.page}`, lore });
    console.log(`ok (${lore.length} chars)`);
  } catch (err) {
    console.log(`FAIL: ${err.message}`);
    out.push({ ...e, source: `https://warhammer40k.fandom.com/wiki/${e.page}`, lore: "", error: err.message });
  }
  await new Promise(r => setTimeout(r, 400));
}

mkdirSync(OUT_DIR, { recursive: true });
for (const c of out) {
  const { lore, ...meta } = c;
  writeFileSync(join(OUT_DIR, `${c.id}.json`), JSON.stringify(meta, null, 2) + "\n");
  writeFileSync(join(OUT_DIR, `${c.id}.md`), (lore ?? "").replace(/\s+$/, "") + "\n");
}
writeFileSync(join(OUT_DIR, "index.json"), JSON.stringify({
  fetchedAt: new Date().toISOString(),
  source: "Warhammer 40k Fandom Wiki (CC-BY-SA)",
  count: out.length,
  order: out.map(c => c.id),
}, null, 2) + "\n");
console.log(`\nwrote ${out.length} files + index.json to ${OUT_DIR}`);
