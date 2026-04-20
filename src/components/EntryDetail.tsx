import type { Entry } from '../lib/datasets'
import type { ParsedLore } from '../lib/parseLore'

type Props = {
  selected: Entry | null
  parsed: ParsedLore | null
  loreLoading: boolean
  placeholder: string
}

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export function EntryDetail({ selected, parsed, loreLoading, placeholder }: Props) {
  if (selected && loreLoading && !parsed) {
    return (
      <article className="primarch-detail">
        <p className="placeholder-detail">Decoding transmission…</p>
      </article>
    )
  }

  if (!selected || !parsed) {
    return (
      <article className="primarch-detail">
        <p className="placeholder-detail">{placeholder}</p>
      </article>
    )
  }

  const remotePortrait = parsed.gallery[0] ?? null
  const portraitSrc = selected.portrait ?? remotePortrait?.url ?? null
  const portraitAlt =
    (selected.portrait ? selected.title : remotePortrait?.caption) ||
    selected.title

  return (
    <article className="primarch-detail">
      <header className="detail-header">
        {portraitSrc && (
          <img
            className="portrait"
            src={portraitSrc}
            alt={portraitAlt}
            loading="lazy"
          />
        )}
        <div className="detail-heading-text">
          <span className="legion-number big">{selected.badge}</span>
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
    </article>
  )
}
