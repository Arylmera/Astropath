import primarchsIndex from '../data/primarchs/index.json'
import spaceMarinesIndex from '../data/space-marines/index.json'
import admechIndex from '../data/admech/index.json'
import sororitasIndex from '../data/sororitas/index.json'

export type RawEntry = {
  id: string
  title: string
  page: string
  source: string
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
  '../data/primarchs/*.json',
  { eager: true, import: 'default' },
)
const spaceMarineModules = import.meta.glob<RawEntry>(
  '../data/space-marines/*.json',
  { eager: true, import: 'default' },
)
const admechModules = import.meta.glob<RawEntry>(
  '../data/admech/*.json',
  { eager: true, import: 'default' },
)
const sororitasModules = import.meta.glob<RawEntry>(
  '../data/sororitas/*.json',
  { eager: true, import: 'default' },
)

// Lore markdown is loaded on demand to keep the initial bundle small.
const loreLoaders = import.meta.glob<string>('../data/**/*.md', {
  query: '?raw',
  import: 'default',
})

function loreKey(datasetKey: DatasetKey, id: string): string {
  const dir = datasetKey === 'primarchs' ? 'primarchs' : datasetKey
  return `../data/${dir}/${id}.md`
}

export async function loadLore(
  datasetKey: DatasetKey,
  id: string,
): Promise<string> {
  const loader = loreLoaders[loreKey(datasetKey, id)]
  if (!loader) return ''
  return await loader()
}

function buildEntries(
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
    .map((e) => ({ ...e, ...decorate(e) }))
}

function initials(title: string): string {
  const words = title
    .replace(/^(The|Saint|Order of|Sisters of the|Sisters of|Adeptus|Adepta)\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
  if (!words.length) return '—'
  return (words[0][0] + (words[1]?.[0] ?? '')).toUpperCase()
}

const primarchs = buildEntries(primarchModules, primarchsIndex.order, (e) => ({
  badge: e.legionNumber ?? '—',
  subtitle: e.legion ?? 'Unknown Legion',
}))

const spaceMarines = buildEntries(
  spaceMarineModules,
  spaceMarinesIndex.order,
  (e) => ({
    badge: e.legionNumber ?? '—',
    subtitle: e.primarch
      ? e.primarch
      : e.founding
        ? `${e.founding} Founding`
        : (e.allegiance ?? 'Chapter'),
  }),
)

const admech = buildEntries(admechModules, admechIndex.order, (e) => ({
  badge: initials(e.title),
  subtitle: e.category ?? 'Adeptus Mechanicus',
}))

const sororitas = buildEntries(sororitasModules, sororitasIndex.order, (e) => ({
  badge: initials(e.title),
  subtitle: e.category ?? 'Adepta Sororitas',
}))

export const DATASETS: DatasetConfig[] = [
  {
    key: 'primarchs',
    label: 'Primarchs',
    placeholder: 'Search by name or legion…',
    empty: 'No transmission matches.',
    detailPlaceholder: 'Select a Primarch to read the record.',
    entries: primarchs,
  },
  {
    key: 'space-marines',
    label: 'Space Marines',
    placeholder: 'Search by chapter, primarch or legion…',
    empty: 'No chapter matches.',
    detailPlaceholder: 'Select a Chapter to read the record.',
    entries: spaceMarines,
  },
  {
    key: 'admech',
    label: 'Adeptus Mechanicus',
    placeholder: 'Search the Omnissiah\u2019s archives…',
    empty: 'No cogitation matches.',
    detailPlaceholder: 'Select a record to access the archives.',
    entries: admech,
  },
  {
    key: 'sororitas',
    label: 'Adepta Sororitas',
    placeholder: 'Search by Order or Saint…',
    empty: 'No hymn matches.',
    detailPlaceholder: 'Select a Sister to read the record.',
    entries: sororitas,
  },
]
