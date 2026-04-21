import type { View } from '@/data/types'

interface Props {
  view: View
  archive: string
  onHome: () => void
  onArchive: (v: View) => void
  currentLabel?: string | null
}

const TABS = [
  { key: 'primarchs',  view: 'galaxy'     as View, label: 'Primarchs' },
  { key: 'mechanicus', view: 'mechanicus' as View, label: 'Adeptus Mechanicus' },
  { key: 'sororitas',  view: 'sororitas'  as View, label: 'Adepta Sororitas' },
]

export default function Chrome({ view, archive, onHome, onArchive, currentLabel }: Props) {
  const onLanding = view === 'galaxy' || view === 'mechanicus' || view === 'sororitas'

  return (
    <header className="chrome">
      <div className="chrome-left" onClick={onHome} style={{ cursor: 'pointer' }}>
        <div className="chrome-mark">A</div>
        <div>
          <div className="chrome-title">Astropath</div>
          <div className="chrome-sub">Lore from the void</div>
        </div>
      </div>

      <nav className="chrome-nav chrome-archives">
        {TABS.map(t => {
          const active = onLanding ? t.view === view : t.key === archive
          return (
            <button
              key={t.key}
              className={active ? 'active' : ''}
              onClick={() => onArchive(t.view)}
            >
              {t.label}
            </button>
          )
        })}
        {!onLanding && currentLabel && (
          <>
            <span className="chrome-sep">/</span>
            <span className="chrome-crumb">{currentLabel}</span>
          </>
        )}
      </nav>
    </header>
  )
}
