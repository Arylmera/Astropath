import type { Entry } from '@/lib/datasets'

type Props = {
  entries: Entry[]
  emptyLabel: string
  selectedId: string | null
  onSelect: (id: string) => void
}

export function EntryList({ entries, emptyLabel, selectedId, onSelect }: Props) {
  return (
    <ul className="primarch-list">
      {entries.length === 0 && <li className="empty">{emptyLabel}</li>}
      {entries.map((e) => (
        <li key={e.id}>
          <button
            type="button"
            className={`primarch-item${selectedId === e.id ? ' active' : ''}`}
            onClick={() => onSelect(e.id)}
          >
            <span className="legion-number">{e.badge}</span>
            <span className="primarch-name">{e.title}</span>
            <span className="legion-name">{e.subtitle}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
