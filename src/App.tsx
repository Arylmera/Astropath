import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { DATASETS, loadLore, type DatasetKey } from './lib/datasets'
import { parseLore } from './lib/parseLore'
import { DatasetNav } from './components/DatasetNav'
import { EntryList } from './components/EntryList'
import { EntryDetail } from './components/EntryDetail'

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
          <DatasetNav
            datasets={DATASETS}
            activeKey={datasetKey}
            onSelect={switchDataset}
          />

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
              <EntryList
                entries={filtered}
                emptyLabel={dataset.empty}
                selectedId={selectedId}
                onSelect={selectEntry}
              />
              <EntryDetail
                selected={selected}
                parsed={parsed}
                loreLoading={loreLoading}
                placeholder={dataset.detailPlaceholder}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
