import type { CSSProperties } from 'react'
import type { Entry } from '@/lib/datasets'
import StainedGlass from './StainedGlass'

interface Props {
  entries: Entry[]
  onOpen: (id: string) => void
}

const CATEGORY_ORDER = [
  'overview',
  'order-militant',
  'character',
  'concept',
  'related',
] as const

const CATEGORY_COPY: Record<string, { title: string; lede: string }> = {
  overview: {
    title: 'Foundations of the Sisterhood',
    lede: 'Core records that frame the Adepta Sororitas, their creed, and their place within the Ecclesiarchy.',
  },
  'order-militant': {
    title: 'Orders Militant',
    lede: 'The great martial orders descended from Dominica’s daughters, each preserved as its own chapel-panel.',
  },
  character: {
    title: 'Saints and Commanders',
    lede: 'Canonised martyrs, living exemplars, and leaders whose deeds shape the Sororitas in the current age.',
  },
  concept: {
    title: 'Ranks and Sacred Offices',
    lede: 'Terms, titles, and archetypes that define how the Sisterhood is organised and remembered.',
  },
  related: {
    title: 'Adjacent Sisterhoods',
    lede: 'Closely related institutions and parallel orders often invoked beside the Sororitas in Imperial records.',
  },
}

function groupEntries(entries: Entry[]) {
  const grouped = new Map<string, Entry[]>()

  for (const entry of entries) {
    const category = entry.category ?? 'related'
    const categoryEntries = grouped.get(category)

    if (categoryEntries) {
      categoryEntries.push(entry)
      continue
    }

    grouped.set(category, [entry])
  }

  const orderedCategories = [
    ...CATEGORY_ORDER.filter((category) => grouped.has(category)),
    ...[...grouped.keys()].filter((category) => !CATEGORY_ORDER.includes(category as typeof CATEGORY_ORDER[number])),
  ]

  return orderedCategories.map((category) => ({
    category,
    ...CATEGORY_COPY[category] ?? {
      title: category.replace(/-/g, ' '),
      lede: 'Additional archive records preserved under this classification.',
    },
    entries: grouped.get(category) ?? [],
  }))
}

export default function SororitasArchive({ entries, onOpen }: Props) {
  const sections = groupEntries(entries)

  return (
    <div className="view sororitas-view">
      <div className="sor-header">
        <div className="sor-header-kicker">
          <span className="sor-cross">✚</span>
          <span>Archive · Adepta Sororitas</span>
        </div>
        <h1>Archive of the Sisterhood</h1>
        <p className="sor-header-lede">
          The Sororitas records are now split by category, from foundational doctrine to the Orders
          Militant, saints, ranks, and related Imperial sisterhoods. Enter a chapel-panel to open
          its archive record.
        </p>
      </div>

      <div className="sor-sections">
        {sections.map((section) => (
          <section key={section.category} className="sor-section">
            <div className="sor-section-head">
              <div className="sor-section-kicker">{section.category.replace(/-/g, ' ')}</div>
              <h2>{section.title}</h2>
              <p>{section.lede}</p>
            </div>

            <div className="sor-nave">
              {section.entries.map((entry) => {
                const [halo, gold, stroke] = entry.glass ?? ['#3a1822', '#c7a15b', '#eadfc8']

                return (
                  <article
                    key={entry.id}
                    className="sor-panel"
                    style={{
                      '--glass-a': halo,
                      '--glass-b': gold,
                      '--glass-c': stroke,
                    } as CSSProperties}
                    onClick={() => onOpen(entry.id)}
                  >
                    <div className="sor-panel-glass">
                      {entry.icon && entry.glass ? (
                        <StainedGlass icon={entry.icon} halo={halo} gold={gold} stroke={stroke} />
                      ) : (
                        <div className="sor-panel-seal" aria-hidden="true">
                          <span>{entry.badge}</span>
                        </div>
                      )}
                    </div>
                    <div className="sor-panel-plate">
                      <div className="sor-panel-matriarch">
                        {entry.matriarch ? `Saint · ${entry.matriarch}` : entry.subtitle}
                      </div>
                      <h3 className="sor-panel-name">{entry.title}</h3>
                      <div className="sor-panel-epithet">
                        {entry.epithet ? `"${entry.epithet}"` : 'Archive Record'}
                      </div>
                      <div className="sor-panel-dogma">
                        {entry.dogma ?? 'Open the transcript from the Sororitas archive'}
                      </div>
                    </div>
                    <div className="sor-panel-rule" />
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="sor-floor-rule" />
      <div className="sor-footer">
        <span>Ave Imperator</span>
        <span>·</span>
        <span>In His Name we Burn</span>
        <span>·</span>
        <span>{entries.length} Archived Sororitas Records</span>
      </div>
    </div>
  )
}
