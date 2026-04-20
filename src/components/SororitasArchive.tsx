import type { Entry } from '@/lib/datasets'
import StainedGlass from './StainedGlass'

interface Props {
  entries: Entry[]
  onOpen: (id: string) => void
}

export default function SororitasArchive({ entries, onOpen }: Props) {
  return (
    <div className="view sororitas-view">
      <div className="sor-header">
        <div className="sor-header-kicker">
          <span className="sor-cross">✚</span>
          <span>Archive · Adepta Sororitas</span>
        </div>
        <h1>Orders Militant of the Ecclesiarchy</h1>
        <p className="sor-header-lede">
          The major Orders Militant of the Sisters of Battle, founded in the shadow of Dominica's
          five daughters. Enter a chapel-panel to read its lives and martyrs.
        </p>
      </div>

      <div className="sor-nave">
        {entries.map((entry) => {
          const [halo, gold, stroke] = entry.glass ?? ['#3a1822', '#c7a15b', '#eadfc8']

          return (
          <article
            key={entry.id}
            className="sor-panel"
            style={{
              '--glass-a': halo,
              '--glass-b': gold,
              '--glass-c': stroke,
            } as React.CSSProperties}
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
              <h2 className="sor-panel-name">{entry.title}</h2>
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
