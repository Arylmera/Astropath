import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../src/data/primarchs/assets");

const API = "https://warhammer40k.fandom.com/api.php";

const ENTRIES = [
  { id: "emperor",       page: "The_Emperor_of_Mankind" },
  { id: "lion",          page: "Lion_El'Jonson" },
  { id: "fulgrim",       page: "Fulgrim" },
  { id: "perturabo",     page: "Perturabo" },
  { id: "jaghatai-khan", page: "Jaghatai_Khan" },
  { id: "leman-russ",    page: "Leman_Russ" },
  { id: "rogal-dorn",    page: "Rogal_Dorn" },
  { id: "konrad-curze",  page: "Konrad_Curze" },
  { id: "sanguinius",    page: "Sanguinius" },
  { id: "ferrus-manus",  page: "Ferrus_Manus" },
  { id: "angron",        page: "Angron" },
  { id: "guilliman",     page: "Roboute_Guilliman" },
  { id: "mortarion",     page: "Mortarion" },
  { id: "magnus",        page: "Magnus_the_Red" },
  { id: "horus",         page: "Horus" },
  { id: "lorgar",        page: "Lorgar_Aurelian" },
  { id: "vulkan",        page: "Vulkan" },
  { id: "corax",         page: "Corvus_Corax" },
  { id: "alpharius",     page: "Alpharius_Omegon" },
];

const UA = "astropath-image-fetch/1.0 (https://github.com/Arylmera/astropath)";

async function getPageImage(page) {
  const url = `${API}?action=query&prop=pageimages&piprop=original&titles=${encodeURIComponent(page)}&format=json&redirects=1`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const pages = json?.query?.pages ?? {};
  const first = Object.values(pages)[0];
  return first?.original?.source ?? null;
}

function extFromUrl(u) {
  const m = u.match(/\.(jpe?g|png|webp|gif)(?:[?#]|$)/i);
  return m ? m[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
}

async function download(url, destPath) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(destPath, buf);
  return buf.length;
}

mkdirSync(OUT_DIR, { recursive: true });

for (const e of ENTRIES) {
  process.stdout.write(`${e.id}... `);
  try {
    const imageUrl = await getPageImage(e.page);
    if (!imageUrl) {
      console.log("no image");
      continue;
    }
    const dir = join(OUT_DIR, e.id);
    mkdirSync(dir, { recursive: true });
    const ext = extFromUrl(imageUrl);
    const dest = join(dir, `portrait.${ext}`);
    const size = await download(imageUrl, dest);
    console.log(`ok (${Math.round(size / 1024)} KB, ${ext})`);
  } catch (err) {
    console.log(`FAIL: ${err.message}`);
  }
  await new Promise((r) => setTimeout(r, 400));
}
