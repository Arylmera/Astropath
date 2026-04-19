import { useMemo, useState } from 'react'
import './App.css'
import primarchsIndex from './data/primarchs/index.json'
import { parseLore } from './lib/parseLore'

type Primarch = {
  id: string
  legionNumber: string | null
  legion: string | null
  title: string
  page: string
  source: string
  lore: string
}

const primarchModules = import.meta.glob<Primarch>(
  './data/primarchs/*.json',
  { eager: true, import: 'default' },
)

const byId = new Map<string, Primarch>()
for (const [path, mod] of Object.entries(primarchModules)) {
  if (path.endsWith('/index.json')) continue
  byId.set(mod.id, mod)
}

const primarchs: Primarch[] = primarchsIndex.order
  .map((id) => byId.get(id))
  .filter((p): p is Primarch => Boolean(p))

function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return primarchs
    return primarchs.filter((p) => {
      const haystack = [p.title, p.legion ?? '', p.legionNumber ?? '']
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query])

  const selected = useMemo(
    () => primarchs.find((p) => p.id === selectedId) ?? null,
    [selectedId],
  )

  const parsed = useMemo(
    () => (selected ? parseLore(selected.lore) : null),
    [selected],
  )

  const portrait = parsed?.gallery[0] ?? null

  return (
    <main className="astropath">
      <header className="hero">
        <h1>Astropath</h1>
        <p className="subtitle">Lore from the void.</p>
      </header>

      <section className="browser">
        <input
          className="search"
          type="search"
          placeholder="Search by name or faction…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />

        <div className="browser-grid">
          <ul className="primarch-list">
            {filtered.length === 0 && (
              <li className="empty">No transmission matches.</li>
            )}
            {filtered.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={`primarch-item${selectedId === p.id ? ' active' : ''}`}
                  onClick={() => setSelectedId(p.id)}
                >
                  <span className="legion-number">
                    {p.legionNumber ?? '—'}
                  </span>
                  <span className="primarch-name">{p.title}</span>
                  <span className="legion-name">
                    {p.legion ?? 'Unknown Legion'}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <article className="primarch-detail">
            {selected && parsed ? (
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
                      {selected.legionNumber ?? '—'}
                    </span>
                    <h2>{selected.title}</h2>
                    <p className="legion-name">
                      {selected.legion ?? 'Unknown Legion'}
                    </p>
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
                          <img src={g.url} alt={g.caption || g.file} loading="lazy" />
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
                              Array.from({ length: 3 - row.length }).map((_, i) => (
                                <td key={`pad-${i}`} />
                              ))}
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
                Select a Primarch to read the record.
              </p>
            )}
          </article>
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
