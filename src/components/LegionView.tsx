import type { Legion, Primarch } from '@/data/types'
import { allegianceClass } from '@/lib/lexicon'
import BackButton from './BackButton'
import LoreList from './LoreList'

interface Props {
  legion: Legion
  primarch: Primarch | null
  onOpenPrimarch: (id: string) => void
  onBack: () => void
}

export default function LegionView({ legion, primarch, onOpenPrimarch, onBack }: Props) {
  const loyalClass = allegianceClass(legion.allegiance)

  return (
    <div className="view">
      <div className="legion-scene">
        {(legion.image || primarch) && (
          <div className="legion-portrait-bg">
            <img
              src={legion.image ?? primarch!.portrait}
              alt={legion.name}
            />
          </div>
        )}
        <div className="legion">
          <BackButton label="Galaxy Map" onClick={onBack} />

          <header className="legion-header">
            <div className="legion-num">{legion.num}</div>
            <div className="legion-title">
              <h1>{legion.name}</h1>
              <div className="motto">"{legion.motto}"</div>
            </div>
            <div className="legion-strength">
              <div className="label">Current Strength</div>
              <div>{legion.strength}</div>
            </div>
          </header>

          <div className="legion-body">
            <LoreList lore={legion.lore} className="legion-lore" />

            <aside className="legion-side">
              {primarch && (
                <div className="primarch-card" onClick={() => onOpenPrimarch(primarch.id)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onOpenPrimarch(primarch.id)}>
                  <div className="primarch-card-img">
                    <img src={primarch.portrait} alt={primarch.name} />
                  </div>
                  <div className="primarch-card-body">
                    <div>
                      <div className="primarch-card-kicker">Primarch · {primarch.num}</div>
                      <div className="primarch-card-name">{primarch.name}</div>
                    </div>
                    <div className="primarch-card-arrow">→</div>
                  </div>
                </div>
              )}

              <div className="side-section">
                <h3>Lexicon</h3>
                <div className="side-list">
                  <div className="row"><span className="k">Founding</span><span className="v">{legion.founding}</span></div>
                  <div className="row"><span className="k">Legion №</span><span className="v">{legion.num}</span></div>
                  <div className="row"><span className="k">Homeworld</span><span className="v">{legion.homeworld}</span></div>
                  <div className="row"><span className="k">Allegiance</span><span className={`v ${loyalClass}`}>{legion.allegiance}</span></div>
                  <div className="row"><span className="k">Colors</span><span className="v">{legion.colors}</span></div>
                </div>
              </div>

              <div className="side-section">
                <h3>Cross-References</h3>
                <div className="side-list">
                  <div className="row"><span className="k">Primarch</span><span className="v">{legion.primarch}</span></div>
                  <div className="row"><span className="k">Motto</span><span className="v" style={{ fontStyle: 'italic' }}>{legion.motto}</span></div>
                  {legion.source && (
                    <div className="row"><span className="k">Lexicanum</span><span className="v"><a href={legion.source} target="_blank" rel="noopener noreferrer">{legion.name}</a></span></div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
