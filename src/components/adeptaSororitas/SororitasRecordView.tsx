import { useEffect, useState } from 'react'
import type { Entry } from '@/lib/datasets'
import { loadLore } from '@/lib/datasets'
import { parseLore, type ParsedLore } from '@/lib/parseLore'

interface Props {
  entry: Entry
  onBack: () => void
}

function sectionId(title: string | null, index: number): string {
  return `sororitas-${title
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    : `intro-${index}`}`
}

export default function SororitasRecordView({ entry, onBack }: Props) {
  const [parsed, setParsed] = useState<ParsedLore | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setParsed(null)

    loadLore('sororitas', entry.id)
      .then((lore) => {
        if (!cancelled) setParsed(parseLore(lore))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [entry.id])

  const titledSections = parsed
    ? parsed.sections
      .map((section, index) => ({ ...section, anchor: sectionId(section.heading, index) }))
      .filter((section) => section.heading)
    : []
  const paragraphs = parsed
    ? parsed.sections.reduce(
      (count, section) => count + section.blocks.filter((block) => block.type === 'p').length,
      0,
    )
    : null
  const sourceIsUrl = /^https?:\/\//.test(entry.source)

  return (
    <div className="view">
      <div className="sororitas-scene">
      {entry.portrait && (
        <div className="sororitas-portrait-bg">
          <img src={entry.portrait} alt={entry.title} />
        </div>
      )}
      <div className="sororitas-content">
      <header className="lore-mast">
        <div className="lore-mast-top">
          <div className="lore-mast-rail">
            <span className="lore-mast-mark">ASTROPATH</span>
            <span className="lore-mast-sep">/</span>
            <span>Sororitas Archive</span>
            <span className="lore-mast-sep">/</span>
            <span>{entry.id.toUpperCase().replace(/-/g, '‑')}</span>
          </div>
          <div className="lore-mast-rail right">
            <span>{entry.subtitle}</span>
            <span className="lore-mast-sep">/</span>
            <span>Archive Record</span>
          </div>
        </div>

        <button className="back-btn lore-mast-back" onClick={onBack}>← Back to archive</button>

        <div className="lore-mast-body">
          <div className="lore-mast-numeral" aria-hidden>{entry.badge}</div>
          <div className="lore-mast-title">
            <div className="lore-mast-kicker">
              <span className="lore-mast-dot" />
              <span>Adepta Sororitas</span>
              <span className="lore-mast-sep">—</span>
              <span>{entry.subtitle}</span>
            </div>
            <h1 className="lore-mast-name">{entry.title}</h1>
            <div className="lore-mast-epithet">{entry.page.replace(/_/g, ' ')}</div>
          </div>
        </div>

        <dl className="lore-manifest">
          <div><dt>Classification</dt><dd>{entry.subtitle}</dd></div>
          <div><dt>Archive Mark</dt><dd>{entry.badge}</dd></div>
          <div><dt>Passages</dt><dd>{paragraphs ?? '—'}</dd></div>
          <div><dt>Sections</dt><dd>{titledSections.length || '—'}</dd></div>
          <div><dt>Source</dt><dd>{sourceIsUrl ? 'Fandom Transcript' : entry.source}</dd></div>
        </dl>
      </header>

      <div className="lore-grid">
        <aside className="lore-toc">
          <div className="lore-toc-head">Table of Contents</div>
          {titledSections.length > 0 ? (
            <ol className="lore-toc-list">
              {titledSections.map((section, index) => (
                <li key={section.anchor}>
                  <a
                    href={`#${section.anchor}`}
                    onClick={(event) => {
                      event.preventDefault()
                      const element = document.getElementById(section.anchor)
                      element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                  >
                    <span className="lore-toc-num">§{String(index + 1).padStart(2, '0')}</span>
                    <span className="lore-toc-name">{section.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          ) : (
            <div className="lore-toc-empty">—</div>
          )}
        </aside>

        <article className="lore-article">
          <div className="lore-article-meta">
            <span>SOURCE · {sourceIsUrl ? 'Warhammer 40k Fandom' : entry.source}</span>
            <span>{entry.id.toUpperCase().replace(/-/g, '‑')}</span>
          </div>

          <div className="lore-doc">
            {loading && !parsed && (
              <div className="lore-doc-state">Retrieving archive record…</div>
            )}

            {!loading && !parsed && (
              <div className="lore-doc-state">Record unavailable.</div>
            )}

            {parsed?.sections.map((section, sectionIndex) => (
              <section
                key={sectionId(section.heading, sectionIndex)}
                id={sectionId(section.heading, sectionIndex)}
                className="lore-doc-section"
              >
                {section.heading && (
                  <h3 className="lore-doc-h">
                    <span className="lore-doc-h-rule" />
                    <span className="lore-doc-h-num">§{String(sectionIndex + 1).padStart(2, '0')}</span>
                    <span className="lore-doc-h-txt">{section.heading}</span>
                  </h3>
                )}
                {section.blocks.map((block, blockIndex) =>
                  block.type === 'p' ? (
                    <p key={blockIndex}>{block.text}</p>
                  ) : (
                    <ul key={blockIndex}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
          </div>

          {parsed && sourceIsUrl && (
            <a
              className="source"
              href={entry.source}
              target="_blank"
              rel="noreferrer"
            >
              Source ↗
            </a>
          )}

          <footer className="lore-end">
            <span className="lore-end-rule" />
            <span className="lore-end-stamp">End of Record</span>
            <span className="lore-end-rule" />
          </footer>

          <div className="lore-article-back">
            <button className="back-btn" onClick={onBack}>
              ← Return to Sororitas archive
            </button>
          </div>
        </article>
      </div>
      </div>
      </div>
    </div>
  )
}
