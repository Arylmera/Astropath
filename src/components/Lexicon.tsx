import type { Primarch, Legion } from '@/data/types'

interface Props {
  primarch: Primarch
  legion: Legion | null
  onOpenLegion: (id: string) => void
  onOpenLore: (id: string) => void
  onBack: () => void
}

export default function Lexicon({ primarch, legion, onOpenLegion, onOpenLore, onBack }: Props) {
  const loyalClass = primarch.allegiance === 'Loyalist' ? 'loyal' : 'traitor'
  const roleLabel  = primarch.roleLabel ?? 'Primarch'
  const metaLabel  = primarch.isEmperor ? 'EMPEROR' : 'PRIMARCH'
  const intro      = (primarch.lore ?? []).slice(0, 1)

  return (
    <div className={`view lexicon ${primarch.isEmperor ? 'emperor-lexicon' : ''}`}>
      <div className="lexicon-hero">
        <div className="lexicon-portrait">
          <img src={primarch.portrait} alt={primarch.name} />
          <div className="lexicon-corner tl" />
          <div className="lexicon-corner tr" />
          <div className="lexicon-portrait-meta">
            <span>{metaLabel} · {primarch.num}</span>
            <span>{primarch.homeworld.toUpperCase()}</span>
            <span>FILE · {primarch.id.toUpperCase().replace('-', '‑')}</span>
          </div>
        </div>

        <div className="lexicon-info">
          <div className="lexicon-roman">{primarch.roman}</div>

          <div style={{ marginBottom: 28 }}>
            <button className="back-btn" onClick={onBack}>← Galaxy Map</button>
          </div>

          <div className="lexicon-kicker">
            <span className="lexicon-kicker-num">
              {roleLabel}{primarch.isEmperor ? '' : ` ${primarch.num}`}
            </span>
            <span>·</span>
            <span>{primarch.legion}</span>
          </div>

          <h1 className="lexicon-name">{primarch.name}</h1>
          <p className="lexicon-epithet">"{primarch.epithet}"</p>

          <div className="lexicon-chips">
            <span className="chip">
              <span className="chip-label">Homeworld</span>
              <span className="chip-value">{primarch.homeworld}</span>
            </span>
            <span className={`chip ${loyalClass}`}>
              <span className="chip-value">{primarch.allegiance}</span>
            </span>
            {!primarch.isEmperor && (
              <span className="chip">
                <span className="chip-label">Legion</span>
                <span className="chip-value">{primarch.num}</span>
              </span>
            )}
            <span className="chip">
              <span className="chip-label">Status</span>
              <span className="chip-value">{primarch.status}</span>
            </span>
          </div>

          <div className="lexicon-lore">
            {intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div
            className="lexicon-links lore-link"
            onClick={() => onOpenLore(primarch.id)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onOpenLore(primarch.id)}
          >
            <div className="lexicon-links-l">
              <div className="lexicon-links-kicker">
                Full Archive Record · {metaLabel} · {primarch.num}
              </div>
              <div className="lexicon-links-name">
                Read the complete file on {primarch.name.replace(/^The\s+/, '')}
              </div>
            </div>
            <div className="lexicon-links-arrow">Open record →</div>
          </div>

          {legion && (
            <div className="lexicon-links" onClick={() => onOpenLegion(legion.id)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onOpenLegion(legion.id)}>
              <div className="lexicon-links-l">
                <div className="lexicon-links-kicker">His Legion · {legion.num} · {legion.allegiance}</div>
                <div className="lexicon-links-name">{legion.name}</div>
              </div>
              <div className="lexicon-links-arrow">Open file →</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
