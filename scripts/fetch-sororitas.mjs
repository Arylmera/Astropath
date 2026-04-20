import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import { polishLore } from "./lib/lore-cleaner.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../src/assets/sororitas");

const API = "https://warhammer40k.fandom.com/api.php";

const ENTRIES = [
  { id: "overview",            category: "overview",  title: "Adepta Sororitas",           page: "Adepta_Sororitas" },
  { id: "ecclesiarchy",        category: "overview",  title: "Adeptus Ministorum",         page: "Adeptus_Ministorum" },
  { id: "order-ebon-chalice",  category: "order-militant", title: "Order of the Ebon Chalice",  page: "Order_of_the_Ebon_Chalice" },
  { id: "order-fiery-heart",   category: "order-militant", title: "Order of the Fiery Heart",   page: "Order_of_the_Fiery_Heart" },
  { id: "order-valorous-heart",category: "order-militant", title: "Order of the Valorous Heart",page: "Order_of_the_Valorous_Heart" },
  { id: "order-argent-shroud", category: "order-militant", title: "Order of the Argent Shroud", page: "Order_of_the_Argent_Shroud" },
  { id: "order-sacred-rose",   category: "order-militant", title: "Order of the Sacred Rose",   page: "Order_of_the_Sacred_Rose" },
  { id: "order-bloody-rose",   category: "order-militant", title: "Order of the Bloody Rose",   page: "Order_of_the_Bloody_Rose" },
  { id: "order-martyred-lady", category: "order-militant", title: "Order of Our Martyred Lady", page: "Order_of_Our_Martyred_Lady" },
  { id: "celestine",           category: "character", title: "Saint Celestine",            page: "Celestine" },
  { id: "katherine",           category: "character", title: "Saint Katherine",            page: "Katherine" },
  { id: "alicia-dominica",     category: "character", title: "Alicia Dominica",            page: "Alicia_Dominica" },
  { id: "silvana",             category: "character", title: "Saint Silvana",              page: "Silvana" },
  { id: "living-saint",        category: "concept",   title: "Living Saint",               page: "Living_Saint" },
  { id: "canoness",            category: "concept",   title: "Canoness",                   page: "Canoness" },
  { id: "sisters-silence",     category: "related",   title: "Sisters of Silence",         page: "Sisters_of_Silence" },
  { id: "sisters-battle",      category: "related",   title: "Sisters of Battle",          page: "Sisters_of_Battle" },
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
console.log(`\nwrote ${out.length} files + index.json to ${OUT_DIR}`);
