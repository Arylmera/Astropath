import type { DatasetConfig, DatasetKey } from '../lib/datasets'

type Props = {
  datasets: DatasetConfig[]
  activeKey: DatasetKey
  onSelect: (key: DatasetKey) => void
}

export function DatasetNav({ datasets, activeKey, onSelect }: Props) {
  return (
    <nav className="dataset-nav" aria-label="Datasets">
      <span className="dataset-nav-label">Archives</span>
      <ul>
        {datasets.map((d) => (
          <li key={d.key}>
            <button
              type="button"
              className={`dataset-nav-item${d.key === activeKey ? ' active' : ''}`}
              onClick={() => onSelect(d.key)}
            >
              <span className="dataset-nav-name">{d.label}</span>
              <span className="dataset-nav-count">{d.entries.length}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
