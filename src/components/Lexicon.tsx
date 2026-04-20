import type { ReactNode } from 'react'
import BackButton from './BackButton'
import LoreList from './LoreList'

interface Chip {
  label?: string
  value: string
  className?: string
}

interface LexiconProps {
  variant: 'primarch' | 'forge' | 'order' | 'emperor'
  portrait: ReactNode
  portraitClass?: string
  meta: [string, string, string]
  roman: ReactNode
  romanClass?: string
  backLabel: string
  onBack: () => void
  kicker: ReactNode
  name: string
  epithet: string
  chips: Chip[]
  lore: string[]
  children?: ReactNode
}

const VARIANT_CLASS: Record<LexiconProps['variant'], string> = {
  emperor: 'emperor-lexicon',
  forge:   'forge-lexicon',
  order:   'order-lexicon',
  primarch: '',
}

export default function Lexicon({
  variant, portrait, portraitClass, meta, roman, romanClass,
  backLabel, onBack, kicker, name, epithet, chips, lore, children,
}: LexiconProps) {
  const variantCls = VARIANT_CLASS[variant]
  return (
    <div className={`view lexicon${variantCls ? ` ${variantCls}` : ''}`}>
      <div className="lexicon-hero">
        <div className={`lexicon-portrait${portraitClass ? ` ${portraitClass}` : ''}`}>
          {portrait}
          <div className="lexicon-corner tl" />
          <div className="lexicon-corner tr" />
          <div className="lexicon-portrait-meta">
            <span>{meta[0]}</span>
            <span>{meta[1]}</span>
            <span>{meta[2]}</span>
          </div>
        </div>

        <div className="lexicon-info">
          <div className={`lexicon-roman${romanClass ? ` ${romanClass}` : ''}`}>{roman}</div>
          <BackButton label={backLabel} onClick={onBack} />
          <div className="lexicon-kicker">{kicker}</div>
          <h1 className="lexicon-name">{name}</h1>
          <p className="lexicon-epithet">"{epithet}"</p>

          <div className="lexicon-chips">
            {chips.map((c, i) => (
              <span key={i} className={`chip${c.className ? ` ${c.className}` : ''}`}>
                {c.label && <span className="chip-label">{c.label}</span>}
                <span className="chip-value">{c.value}</span>
              </span>
            ))}
          </div>

          <LoreList lore={lore} />
          {children}
        </div>
      </div>
    </div>
  )
}
