import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { polishLore } from "./lib/lore-cleaner.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../src/data/primarchs");

const API = "https://warhammer40k.fandom.com/api.php";

const ENTRIES = [
  { id: "emperor",       legionNumber: null, legion: null,              title: "The Emperor of Mankind", page: "The_Emperor_of_Mankind" },
  { id: "lion",          legionNumber: "I",  legion: "Dark Angels",     title: "Lion El'Jonson",         page: "Lion_El'Jonson" },
  { id: "primarch-ii",   legionNumber: "II", legion: "[Redacted]",      title: "Primarch II (Redacted)", page: null },
  { id: "fulgrim",       legionNumber: "III",legion: "Emperor's Children", title: "Fulgrim",             page: "Fulgrim" },
  { id: "perturabo",     legionNumber: "IV", legion: "Iron Warriors",   title: "Perturabo",              page: "Perturabo" },
  { id: "jaghatai-khan", legionNumber: "V",  legion: "White Scars",     title: "Jaghatai Khan",          page: "Jaghatai_Khan" },
  { id: "leman-russ",    legionNumber: "VI", legion: "Space Wolves",    title: "Leman Russ",             page: "Leman_Russ" },
  { id: "rogal-dorn",    legionNumber: "VII",legion: "Imperial Fists",  title: "Rogal Dorn",             page: "Rogal_Dorn" },
  { id: "konrad-curze",  legionNumber: "VIII",legion: "Night Lords",    title: "Konrad Curze",           page: "Konrad_Curze" },
  { id: "sanguinius",    legionNumber: "IX", legion: "Blood Angels",    title: "Sanguinius",             page: "Sanguinius" },
  { id: "ferrus-manus",  legionNumber: "X",  legion: "Iron Hands",      title: "Ferrus Manus",           page: "Ferrus_Manus" },
  { id: "primarch-xi",   legionNumber: "XI", legion: "[Redacted]",      title: "Primarch XI (Redacted)", page: null },
  { id: "angron",        legionNumber: "XII",legion: "World Eaters",    title: "Angron",                 page: "Angron" },
  { id: "guilliman",     legionNumber: "XIII",legion: "Ultramarines",   title: "Roboute Guilliman",      page: "Roboute_Guilliman" },
  { id: "mortarion",     legionNumber: "XIV",legion: "Death Guard",     title: "Mortarion",              page: "Mortarion" },
  { id: "magnus",        legionNumber: "XV", legion: "Thousand Sons",   title: "Magnus the Red",         page: "Magnus_the_Red" },
  { id: "horus",         legionNumber: "XVI",legion: "Sons of Horus / Luna Wolves", title: "Horus Lupercal", page: "Horus" },
  { id: "lorgar",        legionNumber: "XVII",legion: "Word Bearers",   title: "Lorgar Aurelian",        page: "Lorgar_Aurelian" },
  { id: "vulkan",        legionNumber: "XVIII",legion: "Salamanders",   title: "Vulkan",                 page: "Vulkan" },
  { id: "corax",         legionNumber: "XIX",legion: "Raven Guard",     title: "Corvus Corax",           page: "Corvus_Corax" },
  { id: "alpharius",     legionNumber: "XX", legion: "Alpha Legion",    title: "Alpharius Omegon",       page: "Alpharius_Omegon" },
];

function stripWikitext(s) {
  let t = s;
  // drop templates {{...}} including nested (repeat)
  for (let i = 0; i < 8; i++) t = t.replace(/\{\{[^{}]*\}\}/g, "");
  // drop file/image links [[File:...]] / [[Image:...]]
  t = t.replace(/\[\[(?:File|Image):[^\]]*\]\]/gi, "");
  // pipe links [[target|label]] -> label ; plain [[target]] -> target
  t = t.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2");
  t = t.replace(/\[\[([^\]]+)\]\]/g, "$1");
  // ref tags
  t = t.replace(/<ref[^>]*\/>/g, "");
  t = t.replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, "");
  // html tags
  t = t.replace(/<[^>]+>/g, "");
  // bold/italic markers
  t = t.replace(/'{2,5}/g, "");
  // tables
  t = t.replace(/\{\|[\s\S]*?\|\}/g, "");
  // headings kept as plain line
  t = t.replace(/^=+\s*(.+?)\s*=+\s*$/gm, "\n## $1\n");
  // collapse whitespace
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
const REDACTED_LORE = "All records of this primarch and his Legion have been struck from Imperial history. Their names, deeds, and the fate of their gene-sons are known only to the Emperor and a handful of loyal primarchs, who have sworn never to speak of them. Fan speculation and scattered in-universe hints exist, but canonical details remain deliberately absent.";

for (const e of ENTRIES) {
  if (!e.page) {
    out.push({ ...e, source: null, lore: REDACTED_LORE });
    console.log(`static: ${e.title}`);
    continue;
  }
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
for (const p of out) {
  const { lore, ...meta } = p;
  writeFileSync(join(OUT_DIR, `${p.id}.json`), JSON.stringify(meta, null, 2) + "\n");
  writeFileSync(join(OUT_DIR, `${p.id}.md`), (lore ?? "").replace(/\s+$/, "") + "\n");
}
writeFileSync(join(OUT_DIR, "index.json"), JSON.stringify({
  fetchedAt: new Date().toISOString(),
  source: "Warhammer 40k Fandom Wiki (CC-BY-SA)",
  count: out.length,
  order: out.map(p => p.id),
}, null, 2) + "\n");
console.log(`\nwrote ${out.length} .json + .md pairs + index.json to ${OUT_DIR}`);
