import type { Forge } from '@/data/types'
import ForgeSchematic from './ForgeSchematic'

interface Props {
  forge: Forge
  onBack: () => void
}

export default function ForgeLexicon({ forge, onBack }: Props) {
  return (
    <div className="view lexicon forge-lexicon">
      <div className="lexicon-hero">
        <div className="lexicon-portrait forge-portrait">
          <ForgeSchematic seed={forge.iconSeed} label={forge.name} />
          <div className="lexicon-corner tl" />
          <div className="lexicon-corner tr" />
          <div className="lexicon-portrait-meta">
            <span>FORGE · SEGMENTUM {forge.segmentum.toUpperCase()}</span>
            <span>{forge.primacy.toUpperCase()}</span>
            <span>FILE · {forge.id.toUpperCase().replace('-', '‑')}</span>
          </div>
        </div>

        <div className="lexicon-info">
          <div className="lexicon-roman forge-roman">⚙</div>

          <div style={{ marginBottom: 28 }}>
            <button className="back-btn" onClick={onBack}>← Forge Worlds</button>
          </div>

          <div className="lexicon-kicker">
            <span className="lexicon-kicker-num">Forge World</span>
            <span>·</span>
            <span>Segmentum {forge.segmentum}</span>
          </div>

          <h1 className="lexicon-name">{forge.name}</h1>
          <p className="lexicon-epithet">"{forge.epithet}"</p>

          <div className="lexicon-chips">
            <span className="chip">
              <span className="chip-label">Titan Legion</span>
              <span className="chip-value">{forge.titanLegion}</span>
            </span>
            <span className="chip">
              <span className="chip-label">Dogma</span>
              <span className="chip-value">{forge.dogma}</span>
            </span>
            <span className="chip">
              <span className="chip-label">Colours</span>
              <span className="chip-value">{forge.colors}</span>
            </span>
            <span className="chip">
              <span className="chip-label">Primacy</span>
              <span className="chip-value">{forge.primacy}</span>
            </span>
          </div>

          <div className="lexicon-lore">
            {forge.lore.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </div>
    </div>
  )
}
