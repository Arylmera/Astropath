import primarchsIndex from '../assets/primarchs/index.json'
import spaceMarinesIndex from '../assets/space-marines/index.json'
import admechIndex from '../assets/admech/index.json'
import sororitasIndex from '../assets/sororitas/index.json'

export type RawEntry = {
  id: string
  title: string
  page: string
  source: string
  icon?: string | null
  matriarch?: string | null
  epithet?: string | null
  dogma?: string | null
  glass?: [string, string, string] | null
  legionNumber?: string | null
  legion?: string | null
  primarch?: string | null
  founding?: string | null
  allegiance?: string | null
  category?: string | null
}

export type Entry = RawEntry & {
  badge: string
  subtitle: string
  portrait: string | null
}

export type DatasetKey = 'primarchs' | 'space-marines' | 'admech' | 'sororitas'

export type DatasetConfig = {
  key: DatasetKey
  label: string
  placeholder: string
  empty: string
  detailPlaceholder: string
  entries: Entry[]
}

const primarchModules = import.meta.glob<RawEntry>(
  '../assets/primarchs/*/data.json',
  { eager: true, import: 'default' },
)
const spaceMarineModules = import.meta.glob<RawEntry>(
  '../assets/space-marines/*.json',
  { eager: true, import: 'default' },
)
const admechModules = import.meta.glob<RawEntry>(
  '../assets/admech/*.json',
  { eager: true, import: 'default' },
)
const sororitasModules = import.meta.glob<RawEntry>(
  '../assets/sororitas/*.json',
  { eager: true, import: 'default' },
)

const loreLoaders = import.meta.glob<string>('../assets/**/*.md', {
  query: '?raw',
  import: 'default',
})

const portraitUrls = import.meta.glob<string>(
  '../assets/*/*/portrait.{jpg,jpeg,png,webp,gif,svg}',
  { eager: true, query: '?url', import: 'default' },
)

const portraitByKey = new Map<string, string>(
  Object.entries(portraitUrls).flatMap(([path, url]) => {
    const m = path.match(/\/assets\/([^/]+)\/([^/]+)\/portrait\./)
    return m ? [[`${m[1]}/${m[2]}`, url] as const] : []
  }),
)

function portraitFor(datasetKey: DatasetKey, id: string): string | null {
  return portraitByKey.get(`${datasetKey}/${id}`) ?? null
}

function lorePath(datasetKey: DatasetKey, id: string): string {
  return datasetKey === 'primarchs'
    ? `../assets/primarchs/${id}/lore.md`
    : `../assets/${datasetKey}/${id}.md`
}

export async function loadLore(
  datasetKey: DatasetKey,
  id: string,
): Promise<string> {
  return (await loreLoaders[lorePath(datasetKey, id)]?.()) ?? ''
}

function initials(title: string): string {
  const words = title
    .replace(/^(The|Saint|Order of|Sisters of the|Sisters of|Adeptus|Adepta)\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
  if (!words.length) return '—'
  return (words[0][0] + (words[1]?.[0] ?? '')).toUpperCase()
}

function buildEntries(
  datasetKey: DatasetKey,
  modules: Record<string, RawEntry>,
  order: string[],
  decorate: (e: RawEntry) => { badge: string; subtitle: string },
): Entry[] {
  const byId = new Map<string, RawEntry>()
  for (const [path, mod] of Object.entries(modules)) {
    if (path.endsWith('/index.json')) continue
    byId.set(mod.id, mod)
  }
  return order
    .map((id) => byId.get(id))
    .filter((e): e is RawEntry => Boolean(e))
    .map((e) => ({ ...e, ...decorate(e), portrait: portraitFor(datasetKey, e.id) }))
}

export const DATASETS: DatasetConfig[] = [
  {
    key: 'primarchs',
    label: 'Primarchs',
    placeholder: 'Search by name or legion…',
    empty: 'No transmission matches.',
    detailPlaceholder: 'Select a Primarch to read the record.',
    entries: buildEntries('primarchs', primarchModules, primarchsIndex.order, (e) => ({
      badge: e.legionNumber ?? '—',
      subtitle: e.legion ?? 'Unknown Legion',
    })),
  },
  {
    key: 'space-marines',
    label: 'Space Marines',
    placeholder: 'Search by chapter, primarch or legion…',
    empty: 'No chapter matches.',
    detailPlaceholder: 'Select a Chapter to read the record.',
    entries: buildEntries('space-marines', spaceMarineModules, spaceMarinesIndex.order, (e) => ({
      badge: e.legionNumber ?? '—',
      subtitle: e.primarch ?? (e.founding ? `${e.founding} Founding` : (e.allegiance ?? 'Chapter')),
    })),
  },
  {
    key: 'admech',
    label: 'Adeptus Mechanicus',
    placeholder: 'Search the Omnissiah\u2019s archives…',
    empty: 'No cogitation matches.',
    detailPlaceholder: 'Select a record to access the archives.',
    entries: buildEntries('admech', admechModules, admechIndex.order, (e) => ({
      badge: initials(e.title),
      subtitle: e.category ?? 'Adeptus Mechanicus',
    })),
  },
  {
    key: 'sororitas',
    label: 'Adepta Sororitas',
    placeholder: 'Search by Order or Saint…',
    empty: 'No hymn matches.',
    detailPlaceholder: 'Select a Sister to read the record.',
    entries: buildEntries('sororitas', sororitasModules, sororitasIndex.order, (e) => ({
      badge: initials(e.title),
      subtitle: e.category ?? 'Adepta Sororitas',
    })),
  },
]
