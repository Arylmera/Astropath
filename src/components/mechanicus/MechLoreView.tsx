import { useState, useEffect, type ReactNode } from 'react'
import { loadLore } from '@/lib/datasets'
import { formatFileId } from '@/lib/lexicon'
import { MechanicalCog } from '@/screens/AdeptusMechanicusScreen'

// ---- lore markdown loader --------------------------------------------------

interface LoreSection {
  title: string | null
  paragraphs: string[]
}

interface LoreState {
  status: 'idle' | 'loading' | 'ready' | 'error'
  sections?: LoreSection[]
  error?: string
}

const _loreCache: Record<string, LoreState> = {}

function cleanLoreLine(s: string): string {
  return s
    .replace(/\[https?:\/\/[^\s\]]+\s+([^\]]+)\]/g, '$1')
    .replace(/\[\[([^\]|]+\|)?([^\]]+)\]\]/g, '$2')
    .replace(/<[^>]+>/g, '')
    .replace(/\{\{[^}]*\}\}/g, '')
    .trim()
}

function parseLoreMarkdown(md: string): LoreSection[] {
  const lines = md.split(/\r?\n/)
  const sections: LoreSection[] = []
  let current: LoreSection = { title: null, paragraphs: [] }
  let buf: string[] = []

  const flushPara = () => {
    const joined = buf.join(' ').trim()
    buf = []
    if (!joined) return
    const cleaned = cleanLoreLine(joined)
    if (!cleaned) return
    if (/^,\s/.test(cleaned)) return
    if (/^Note:\s/i.test(cleaned)) return
    current.paragraphs.push(cleaned)
  }

  const flushSection = () => {
    flushPara()
    if (current.title !== null || current.paragraphs.length) {
      sections.push(current)
    }
    current = { title: null, paragraphs: [] }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (/^##\s+/.test(line)) {
      flushSection()
      current.title = line.replace(/^##\s+/, '').trim()
    } else if (line === '') {
      flushPara()
    } else {
      buf.push(line)
    }
  }
  flushSection()
  return sections
}

function useLoreDocument(id: string | null): LoreState {
  const cacheKey = id ? `admech:${id}` : null
  const [state, setState] = useState<LoreState>(
    () => (cacheKey && _loreCache[cacheKey]) ? _loreCache[cacheKey] : { status: 'idle' }
  )
  useEffect(() => {
    if (!cacheKey || !id) return
    if (_loreCache[cacheKey]?.status === 'ready') { setState(_loreCache[cacheKey]); return }
    let cancelled = false
    _loreCache[cacheKey] = { status: 'loading' }
    setState(_loreCache[cacheKey])
    loadLore('admech', id)
      .then(text => {
        const parsed = parseLoreMarkdown(text)
        _loreCache[cacheKey] = { status: 'ready', sections: parsed }
        if (!cancelled) setState(_loreCache[cacheKey])
      })
      .catch(err => {
        _loreCache[cacheKey] = { status: 'error', error: String(err) }
        if (!cancelled) setState(_loreCache[cacheKey])
      })
    return () => { cancelled = true }
  }, [cacheKey, id])
  return state
}

function sectionId(title: string | null, idx: number): string {
  return 'sec-' + (title
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    : `intro-${idx}`)
}

interface LoreDocumentProps {
  id: string
}

function LoreDocument({ id }: LoreDocumentProps) {
  const doc = useLoreDocument(id)
  if (doc.status === 'loading' || doc.status === 'idle') {
    return <div className="lore-doc-state">Retrieving archive record…</div>
  }
  if (doc.status === 'error') {
    return <div className="lore-doc-state">Record unavailable.</div>
  }
  if (!doc.sections || doc.sections.length === 0) {
    return <div className="lore-doc-state">No record on file.</div>
  }
  return (
    <div className="lore-doc">
      {doc.sections.map((s, i) => (
        <section key={i} id={sectionId(s.title, i)} className="lore-doc-section">
          {s.title && (
            <h3 className="lore-doc-h">
              <span className="lore-doc-h-rule" />
              <span className="lore-doc-h-num">§{String(i).padStart(2, '0')}</span>
              <span className="lore-doc-h-txt">{s.title}</span>
            </h3>
          )}
          {s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
        </section>
      ))}
    </div>
  )
}

interface ManifestField {
  label: string
  value: ReactNode
}

interface Props {
  id: string
  title: string
  epithet?: string
  kicker: ReactNode
  classification?: string
  manifest?: ManifestField[]
  onBack: () => void
  backLabel?: string
  image?: string
}

export default function MechLoreView({
  id,
  title,
  epithet,
  kicker,
  classification = 'Classified · Ferrum',
  manifest = [],
  onBack,
  backLabel,
  image,
}: Props) {
  const doc      = useLoreDocument(id)
  const filename = `FILE-${formatFileId(id)}`

  const passages     = doc.status === 'ready' ? doc.sections!.reduce((n, s) => n + s.paragraphs.length, 0) : null
  const sectionCount = doc.status === 'ready' ? doc.sections!.filter(s => s.title).length : null
  const titledSections = doc.status === 'ready'
    ? doc.sections!.map((s, i) => ({ ...s, idx: i, anchor: sectionId(s.title, i) })).filter(s => s.title)
    : []

  return (
    <div className="view">
      {image && (
        <div className="lore-portrait-bg">
          <img src={image} alt="" aria-hidden />
        </div>
      )}
      <div className="lore-view">
        <header className="lore-mast">
          <div className="lore-mast-top">
            <div className="lore-mast-rail">
              <span className="lore-mast-mark">ASTROPATH</span>
              <span className="lore-mast-sep">/</span>
              <span>Archive Record</span>
              <span className="lore-mast-sep">/</span>
              <span>{filename}</span>
            </div>
            <div className="lore-mast-rail right">
              <span>{classification}</span>
              <span className="lore-mast-sep">/</span>
              <span>Adeptus Mechanicus</span>
            </div>
          </div>

          <button className="back-btn lore-mast-back" onClick={onBack}>← {backLabel ?? 'Back to lexicon'}</button>

          <div className="lore-mast-body">
            <div className="lore-mast-numeral forge-roman" aria-hidden>
              <svg viewBox="-180 -180 360 360" width="100%" height="100%">
                <MechanicalCog teeth={24} outer={170} inner={148} />
              </svg>
            </div>
            <div className="lore-mast-title">
              <div className="lore-mast-kicker">
                <span className="lore-mast-dot" />
                {kicker}
              </div>
              <h1 className="lore-mast-name">{title}</h1>
              {epithet && <div className="lore-mast-epithet">"{epithet}"</div>}
            </div>
          </div>

          <dl className="lore-manifest">
            {manifest.map((f, i) => (
              <div key={i}><dt>{f.label}</dt><dd>{f.value}</dd></div>
            ))}
            <div><dt>Passages</dt><dd>{passages ?? '—'}</dd></div>
            <div><dt>Sections</dt><dd>{sectionCount ?? '—'}</dd></div>
          </dl>
        </header>

        <div className="lore-grid">
          <aside className="lore-toc">
            <div className="lore-toc-head">Table of Contents</div>
            {titledSections.length > 0 ? (
              <ol className="lore-toc-list">
                {titledSections.map((s, i) => (
                  <li key={s.anchor}>
                    <a
                      href={`#${s.anchor}`}
                      onClick={e => {
                        e.preventDefault()
                        document.getElementById(s.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                    >
                      <span className="lore-toc-num">§{String(i + 1).padStart(2, '0')}</span>
                      <span className="lore-toc-name">{s.title}</span>
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
              <span>SOURCE · Warhammer 40k Fandom · CC-BY-SA</span>
              <span>{filename}</span>
            </div>
            <LoreDocument id={id} />
            <footer className="lore-end">
              <span className="lore-end-rule" />
              <span className="lore-end-stamp">End of Record</span>
              <span className="lore-end-rule" />
            </footer>
            <div className="lore-article-back">
              <button className="back-btn" onClick={onBack}>
                ← Return to {title} lexicon
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
}
