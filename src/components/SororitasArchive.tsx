import type { Entry } from '@/lib/datasets'
import StainedGlass from './StainedGlass'

type LegacyOrderDisplay = {
  icon: string
  matriarch: string
  epithet: string
  dogma: string
  glass: [string, string, string]
}

const legacyOrderDisplayById: Record<string, LegacyOrderDisplay> = {
  'order-martyred-lady': {
    icon: 'skull-and-tears',
    matriarch: 'Saint Katherine',
    epithet: 'Fire of the Righteous',
    dogma: 'Unrelenting pursuit of the faithless',
    glass: ['#a31622', '#1b1a1c', '#e5dccd'],
  },
  'order-ebon-chalice': {
    icon: 'chalice',
    matriarch: 'Saint Alicia Dominica',
    epithet: 'The Eldest Daughters',
    dogma: 'Keepers of the first truth',
    glass: ['#0a0a0c', '#c9a042', '#efe6cd'],
  },
  'order-bloody-rose': {
    icon: 'rose-and-sword',
    matriarch: 'Saint Mina',
    epithet: 'Blades in Earnest',
    dogma: 'Martial prowess above all',
    glass: ['#6d0f1d', '#1a0a0c', '#9aa0a8'],
  },
  'order-valorous-heart': {
    icon: 'heart-and-thorn',
    matriarch: 'Saint Lucia',
    epithet: 'The Penitent',
    dogma: 'Atonement through endurance',
    glass: ['#1c1c26', '#3a5061', '#cfcfd4'],
  },
  'order-argent-shroud': {
    icon: 'shroud',
    matriarch: 'Saint Silvana',
    epithet: 'The Silent Sisters',
    dogma: 'Deeds, not words',
    glass: ['#8a8c93', '#1a1b1f', '#e6e7eb'],
  },
  'order-sacred-rose': {
    icon: 'rose-bloom',
    matriarch: 'Saint Arabella',
    epithet: 'Beacons of Hope',
    dogma: 'Faith against despair',
    glass: ['#f1e9d8', '#d5a37a', '#8fa7c1'],
  },
}

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
          const legacyDisplay = legacyOrderDisplayById[entry.id]
          const [halo, gold, stroke] = legacyDisplay?.glass ?? ['#3a1822', '#c7a15b', '#eadfc8']

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
              {legacyDisplay ? (
                <StainedGlass icon={legacyDisplay.icon} halo={halo} gold={gold} stroke={stroke} />
              ) : (
                <div className="sor-panel-seal" aria-hidden="true">
                  <span>{entry.badge}</span>
                </div>
              )}
            </div>
            <div className="sor-panel-plate">
              <div className="sor-panel-matriarch">
                {legacyDisplay ? `Saint · ${legacyDisplay.matriarch}` : entry.subtitle}
              </div>
              <h2 className="sor-panel-name">{entry.title}</h2>
              <div className="sor-panel-epithet">
                {legacyDisplay ? `"${legacyDisplay.epithet}"` : 'Archive Record'}
              </div>
              <div className="sor-panel-dogma">
                {legacyDisplay ? legacyDisplay.dogma : 'Open the transcript from the Sororitas archive'}
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
