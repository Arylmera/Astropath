import { useState, useEffect } from 'react'
import type { Primarch } from '@/data/types'
import { loadLore } from '@/lib/datasets'
import { allegianceClass } from '@/lib/lexicon'

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
  const [state, setState] = useState<LoreState>(
    () => (id && _loreCache[id]) ? _loreCache[id] : { status: 'idle' }
  )
  useEffect(() => {
    if (!id) return
    if (_loreCache[id]?.status === 'ready') { setState(_loreCache[id]); return }
    let cancelled = false
    _loreCache[id] = { status: 'loading' }
    setState(_loreCache[id])
    loadLore('primarchs', id)
      .then(text => {
        const parsed = parseLoreMarkdown(text)
        _loreCache[id] = { status: 'ready', sections: parsed }
        if (!cancelled) setState(_loreCache[id])
      })
      .catch(err => {
        _loreCache[id] = { status: 'error', error: String(err) }
        if (!cancelled) setState(_loreCache[id])
      })
    return () => { cancelled = true }
  }, [id])
  return state
}

function sectionId(title: string | null, idx: number): string {
  return 'sec-' + (title
    ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    : `intro-${idx}`)
}

// ---- LoreDocument ----------------------------------------------------------

interface LoreDocumentProps {
  id: string
  onClose?: () => void
}

function LoreDocument({ id, onClose }: LoreDocumentProps) {
  const doc = useLoreDocument(id)
  if (doc.status === 'loading' || doc.status === 'idle') {
    return <div className="lore-doc-state">Retrieving archive record…</div>
  }
  if (doc.status === 'error') {
    return <div className="lore-doc-state">Record unavailable.</div>
  }
  return (
    <div className="lore-doc">
      {doc.sections!.map((s, i) => (
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
      {onClose && (
        <button className="see-more-btn" onClick={onClose}>Show less ↑</button>
      )}
    </div>
  )
}

// ---- LoreView --------------------------------------------------------------

interface Props {
  primarch: Primarch
  onBack: () => void
}

export default function LoreView({ primarch, onBack }: Props) {
  const metaLabel  = primarch.isEmperor ? 'EMPEROR' : 'PRIMARCH'
  const doc        = useLoreDocument(primarch.id)
  const loyalClass = allegianceClass(primarch.allegiance)
  const filename   = `FILE-${primarch.num}-${primarch.id.toUpperCase().replace(/-/g, '‑')}`

  const passages     = doc.status === 'ready' ? doc.sections!.reduce((n, s) => n + s.paragraphs.length, 0) : null
  const sectionCount = doc.status === 'ready' ? doc.sections!.filter(s => s.title).length : null
  const titledSections = doc.status === 'ready'
    ? doc.sections!.map((s, i) => ({ ...s, idx: i, anchor: sectionId(s.title, i) })).filter(s => s.title)
    : []

  return (
    <div className="view lore-view">
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
            <span>Classified · Vermilion</span>
            <span className="lore-mast-sep">/</span>
            <span>Segmentum Solar</span>
          </div>
        </div>

        <button className="back-btn lore-mast-back" onClick={onBack}>← Back to lexicon</button>

        <div className="lore-mast-body">
          <div className="lore-mast-numeral" aria-hidden>{primarch.roman}</div>
          <div className="lore-mast-title">
            <div className="lore-mast-kicker">
              <span className="lore-mast-dot" />
              <span>{metaLabel} · {primarch.num}</span>
              <span className="lore-mast-sep">—</span>
              <span>{primarch.legion}</span>
            </div>
            <h1 className="lore-mast-name">{primarch.name}</h1>
            <div className="lore-mast-epithet">"{primarch.epithet}"</div>
          </div>
        </div>

        <dl className="lore-manifest">
          <div><dt>Homeworld</dt><dd>{primarch.homeworld}</dd></div>
          <div><dt>Allegiance</dt><dd className={`lore-manifest-v ${loyalClass}`}>{primarch.allegiance}</dd></div>
          <div><dt>Status</dt><dd>{primarch.status}</dd></div>
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
          <LoreDocument id={primarch.id} />
          <footer className="lore-end">
            <span className="lore-end-rule" />
            <span className="lore-end-stamp">End of Record</span>
            <span className="lore-end-rule" />
          </footer>
          <div className="lore-article-back">
            <button className="back-btn" onClick={onBack}>
              ← Return to {primarch.name.replace(/^The\s+/, '')} lexicon
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}
