import { useEffect, useMemo, useState } from 'react'
import './App.css'
import primarchsIndex from './data/primarchs/index.json'
import spaceMarinesIndex from './data/space-marines/index.json'
import admechIndex from './data/admech/index.json'
import sororitasIndex from './data/sororitas/index.json'
import { parseLore } from './lib/parseLore'

type RawEntry = {
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

type Entry = RawEntry & {
  badge: string
  subtitle: string
}

type DatasetKey = 'primarchs' | 'space-marines' | 'admech' | 'sororitas'

type DatasetConfig = {
  key: DatasetKey
  label: string
  placeholder: string
  empty: string
  detailPlaceholder: string
  entries: Entry[]
}

const primarchModules = import.meta.glob<RawEntry>(
  './data/primarchs/*.json',
  { eager: true, import: 'default' },
)
const spaceMarineModules = import.meta.glob<RawEntry>(
  './data/space-marines/*.json',
  { eager: true, import: 'default' },
)
const admechModules = import.meta.glob<RawEntry>(
  './data/admech/*.json',
  { eager: true, import: 'default' },
)
const sororitasModules = import.meta.glob<RawEntry>(
  './data/sororitas/*.json',
  { eager: true, import: 'default' },
)

// Lore markdown is loaded on demand to keep the initial bundle small.
const loreLoaders = import.meta.glob<string>('./data/**/*.md', {
  query: '?raw',
  import: 'default',
})

function loreKey(datasetKey: DatasetKey, id: string): string {
  const dir = datasetKey === 'primarchs' ? 'primarchs' : datasetKey
  return `./data/${dir}/${id}.md`
}

async function loadLore(datasetKey: DatasetKey, id: string): Promise<string> {
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

function initials(title: string): string {
  const words = title
    .replace(/^(The|Saint|Order of|Sisters of the|Sisters of|Adeptus|Adepta)\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
  if (!words.length) return '—'
  return (words[0][0] + (words[1]?.[0] ?? '')).toUpperCase()
}

const DATASETS: DatasetConfig[] = [
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

function App() {
  const [datasetKey, setDatasetKey] = useState<DatasetKey>('primarchs')
  const [query, setQuery] = useState('')
  const [selectedByDataset, setSelectedByDataset] = useState<
    Record<DatasetKey, string | null>
  >({
    primarchs: null,
    'space-marines': null,
    admech: null,
    sororitas: null,
  })

  const dataset = DATASETS.find((d) => d.key === datasetKey)!
  const selectedId = selectedByDataset[datasetKey]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return dataset.entries
    return dataset.entries.filter((e) => {
      const haystack = [
        e.title,
        e.subtitle,
        e.badge,
        e.legion ?? '',
        e.legionNumber ?? '',
        e.primarch ?? '',
        e.category ?? '',
        e.founding ?? '',
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [dataset, query])

  const selected = useMemo(
    () => dataset.entries.find((e) => e.id === selectedId) ?? null,
    [dataset, selectedId],
  )

  const [lore, setLore] = useState<string>('')
  const [loreLoading, setLoreLoading] = useState(false)
  useEffect(() => {
    if (!selected) {
      setLore('')
      return
    }
    let cancelled = false
    setLoreLoading(true)
    loadLore(datasetKey, selected.id)
      .then((text) => {
        if (!cancelled) setLore(text)
      })
      .finally(() => {
        if (!cancelled) setLoreLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [datasetKey, selected])

  const parsed = useMemo(() => (lore ? parseLore(lore) : null), [lore])

  const portrait = parsed?.gallery[0] ?? null

  const selectEntry = (id: string) =>
    setSelectedByDataset((prev) => ({ ...prev, [datasetKey]: id }))

  const switchDataset = (key: DatasetKey) => {
    if (key === datasetKey) return
    setDatasetKey(key)
    setQuery('')
  }

  return (
    <main className="astropath">
      <header className="hero">
        <h1>Astropath</h1>
        <p className="subtitle">Lore from the void.</p>
      </header>

      <section className="browser">
        <div className="browser-layout">
          <nav className="dataset-nav" aria-label="Datasets">
            <span className="dataset-nav-label">Archives</span>
            <ul>
              {DATASETS.map((d) => (
                <li key={d.key}>
                  <button
                    type="button"
                    className={`dataset-nav-item${d.key === datasetKey ? ' active' : ''}`}
                    onClick={() => switchDataset(d.key)}
                  >
                    <span className="dataset-nav-name">{d.label}</span>
                    <span className="dataset-nav-count">
                      {d.entries.length}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="browser-main">
            <input
              className="search"
              type="search"
              placeholder={dataset.placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />

            <div className="browser-grid">
              <ul className="primarch-list">
                {filtered.length === 0 && (
                  <li className="empty">{dataset.empty}</li>
                )}
                {filtered.map((e) => (
                  <li key={e.id}>
                    <button
                      type="button"
                      className={`primarch-item${selectedId === e.id ? ' active' : ''}`}
                      onClick={() => selectEntry(e.id)}
                    >
                      <span className="legion-number">{e.badge}</span>
                      <span className="primarch-name">{e.title}</span>
                      <span className="legion-name">{e.subtitle}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <article className="primarch-detail">
                {selected && loreLoading && !parsed ? (
                  <p className="placeholder-detail">Decoding transmission…</p>
                ) : selected && parsed ? (
                  <>
                    <header className="detail-header">
                      {portrait && (
                        <img
                          className="portrait"
                          src={portrait.url}
                          alt={portrait.caption || selected.title}
                          loading="lazy"
                        />
                      )}
                      <div className="detail-heading-text">
                        <span className="legion-number big">
                          {selected.badge}
                        </span>
                        <h2>{selected.title}</h2>
                        <p className="legion-name">{selected.subtitle}</p>
                      </div>
                    </header>

                    <div className="lore">
                      {parsed.sections.map((section, si) => (
                        <section key={si} className="lore-section">
                          {section.heading && <h3>{section.heading}</h3>}
                          {section.blocks.map((b, bi) =>
                            b.type === 'p' ? (
                              <p key={bi}>{b.text}</p>
                            ) : (
                              <ul key={bi}>
                                {b.items.map((it, ii) => (
                                  <li key={ii}>{it}</li>
                                ))}
                              </ul>
                            ),
                          )}
                        </section>
                      ))}
                    </div>

                    {parsed.gallery.length > 1 && (
                      <section className="lore-section">
                        <h3>Gallery</h3>
                        <div className="gallery">
                          {parsed.gallery.slice(1).map((g) => (
                            <figure key={g.file}>
                              <img
                                src={g.url}
                                alt={g.caption || g.file}
                                loading="lazy"
                              />
                              {g.caption && <figcaption>{g.caption}</figcaption>}
                            </figure>
                          ))}
                        </div>
                      </section>
                    )}

                    {parsed.categories.length > 0 && (
                      <section className="lore-section">
                        <h3>Categories</h3>
                        <table className="categories-table">
                          <tbody>
                            {chunk(parsed.categories, 3).map((row, ri) => (
                              <tr key={ri}>
                                {row.map((c) => (
                                  <td key={c}>{c}</td>
                                ))}
                                {row.length < 3 &&
                                  Array.from({ length: 3 - row.length }).map(
                                    (_, i) => <td key={`pad-${i}`} />,
                                  )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </section>
                    )}

                    <a
                      className="source"
                      href={selected.source}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source ↗
                    </a>
                  </>
                ) : (
                  <p className="placeholder-detail">
                    {dataset.detailPlaceholder}
                  </p>
                )}
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export default App
