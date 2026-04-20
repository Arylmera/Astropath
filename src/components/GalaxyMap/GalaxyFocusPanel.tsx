import type { Primarch } from '@/data/types'

interface Props {
  focus: Primarch | null
  onOpen: (id: string) => void
}

export default function GalaxyFocusPanel({ focus, onOpen }: Props) {
  if (!focus) return null

  return (
    <aside className="galaxy-focus visible">
      <div className="galaxy-focus-num">Primarch · {focus.num}</div>
      <h2 className="galaxy-focus-name">{focus.name}</h2>
      <div className="galaxy-focus-epithet">"{focus.epithet}"</div>
      <div className="galaxy-focus-meta">
        <div>
          <div className="label">Legion</div>
          <div className="value">{focus.legion}</div>
        </div>
        <div>
          <div className="label">Homeworld</div>
          <div className="value">{focus.homeworld}</div>
        </div>
        <div>
          <div className="label">Allegiance</div>
          <div className="value" style={{
            color: focus.allegiance === 'Loyalist' ? 'var(--loyal)' : 'var(--traitor)'
          }}>
            {focus.allegiance}
          </div>
        </div>
        <div>
          <div className="label">Status</div>
          <div className="value">{focus.status}</div>
        </div>
      </div>
      <button className="galaxy-focus-open" onClick={() => onOpen(focus.id)}>
        Open Lexicon →
      </button>
    </aside>
  )
}
