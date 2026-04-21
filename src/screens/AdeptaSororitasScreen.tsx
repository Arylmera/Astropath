import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import type { Entry } from '@/lib/datasets'
import StainedGlass from '@/components/adeptaSororitas/StainedGlass'
import {
  CATEGORY_ORDER,
  CATEGORY_COPY,
  ARCHIVE_HEADER,
  ARCHIVE_FOOTER,
  PANEL_DEFAULTS,
} from '@/components/adeptaSororitas/SororitasArchive.config'

interface Props {
  entries: Entry[]
  onOpen: (id: string) => void
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
      lede: PANEL_DEFAULTS.unknownCategoryLede,
    },
    entries: grouped.get(category) ?? [],
  }))
}

export default function AdeptaSororitasScreen({ entries, onOpen }: Props) {
  const sections = groupEntries(entries)

  return (
    <div className="view sororitas-view">
      <div className="sor-header">
        <div className="sor-header-kicker">
          <span className="sor-cross">{ARCHIVE_HEADER.cross}</span>
          <span>{ARCHIVE_HEADER.kicker}</span>
        </div>
        <h1>{ARCHIVE_HEADER.title}</h1>
        <p className="sor-header-lede">{ARCHIVE_HEADER.lede}</p>
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
                const [halo, gold, stroke] = entry.glass ?? PANEL_DEFAULTS.glass

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
                        {entry.epithet ? `"${entry.epithet}"` : PANEL_DEFAULTS.epithet}
                      </div>
                      <div className="sor-panel-dogma">
                        {entry.dogma ?? PANEL_DEFAULTS.dogma}
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
        {ARCHIVE_FOOTER.map((text, i) => (
          <Fragment key={i}>
            <span>{text}</span>
            <span>·</span>
          </Fragment>
        ))}
        <span>{entries.length} Archived Sororitas Records</span>
      </div>
    </div>
  )
}
