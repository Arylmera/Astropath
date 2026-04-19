import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { polishLore } from "./lib/lore-cleaner.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../src/data/admech");

const API = "https://warhammer40k.fandom.com/api.php";

const ENTRIES = [
  { id: "adeptus-mechanicus", category: "Organisation", title: "Adeptus Mechanicus",      page: "Adeptus_Mechanicus" },
  { id: "mechanicum",         category: "Organisation", title: "Mechanicum (pre-Heresy)",  page: "Mechanicum" },
  { id: "cult-mechanicus",    category: "Organisation", title: "Cult Mechanicus",          page: "Cult_Mechanicus" },
  { id: "omnissiah",          category: "Theology",     title: "Omnissiah",                page: "Omnissiah" },
  { id: "machine-god",        category: "Theology",     title: "Machine God",              page: "Machine_God" },
  { id: "machine-spirit",     category: "Theology",     title: "Machine Spirit",           page: "Machine_Spirit" },
  { id: "mars",               category: "Forge World",  title: "Mars",                     page: "Mars" },
  { id: "ryza",               category: "Forge World",  title: "Ryza",                     page: "Ryza" },
  { id: "metalica",           category: "Forge World",  title: "Metalica",                 page: "Metalica" },
  { id: "stygies-viii",       category: "Forge World",  title: "Stygies VIII",             page: "Stygies_VIII" },
  { id: "lucius",             category: "Forge World",  title: "Lucius",                   page: "Lucius" },
  { id: "agripinaa",          category: "Forge World",  title: "Agripinaa",                page: "Agripinaa" },
  { id: "graia",              category: "Forge World",  title: "Graia",                    page: "Graia" },
  { id: "fabricator-general", category: "Rank",         title: "Fabricator-General",       page: "Fabricator-General" },
  { id: "tech-priest",        category: "Rank",         title: "Tech-Priest",              page: "Tech-Priest" },
  { id: "magos",              category: "Rank",         title: "Magos",                    page: "Magos" },
  { id: "archmagos",          category: "Rank",         title: "Archmagos",                page: "Archmagos" },
  { id: "belisarius-cawl",    category: "Character",    title: "Belisarius Cawl",          page: "Belisarius_Cawl" },
  { id: "kelbor-hal",         category: "Character",    title: "Kelbor-Hal",               page: "Kelbor-Hal" },
  { id: "skitarii",           category: "Military",     title: "Skitarii",                 page: "Skitarii" },
  { id: "kataphron",          category: "Military",     title: "Kataphron",                page: "Kataphron" },
  { id: "electro-priest",     category: "Military",     title: "Electro-Priest",           page: "Electro-Priest" },
  { id: "sicarian",           category: "Military",     title: "Sicarian Infiltrator",     page: "Sicarian_Infiltrator" },
  { id: "ironstrider",        category: "Military",     title: "Ironstrider",              page: "Ironstrider" },
  { id: "kastelan-robot",     category: "Military",     title: "Kastelan Robot",           page: "Kastelan_Robot" },
  { id: "legio-cybernetica",  category: "Military",     title: "Legio Cybernetica",        page: "Legio_Cybernetica" },
  { id: "titan",              category: "Military",     title: "Titan",                    page: "Titan" },
  { id: "collegia-titanica",  category: "Military",     title: "Collegia Titanica",        page: "Collegia_Titanica" },
  { id: "imperial-knights",   category: "Military",     title: "Imperial Knights",         page: "Imperial_Knights" },
  { id: "standard-template-construct", category: "Technology", title: "Standard Template Construct", page: "Standard_Template_Construct" },
  { id: "dark-age-of-technology",      category: "History",    title: "Dark Age of Technology",      page: "Dark_Age_of_Technology" },
  { id: "schism-of-mars",     category: "History",      title: "Schism of Mars",           page: "Schism_of_Mars" },
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
for (const p of out) {
  writeFileSync(join(OUT_DIR, `${p.id}.json`), JSON.stringify(p, null, 2) + "\n");
}
writeFileSync(join(OUT_DIR, "index.json"), JSON.stringify({
  fetchedAt: new Date().toISOString(),
  source: "Warhammer 40k Fandom Wiki (CC-BY-SA)",
  count: out.length,
  order: out.map(p => p.id),
}, null, 2) + "\n");
console.log(`\nwrote ${out.length} files + index.json to ${OUT_DIR}`);
