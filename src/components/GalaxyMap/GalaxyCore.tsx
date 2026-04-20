import type { Primarch } from '@/data/types'
import { cx, cy } from './utils'

interface Props {
  emperor: Primarch | undefined
  coreHover: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onOpen: (id: string) => void
}

export default function GalaxyCore({ emperor, coreHover, onMouseEnter, onMouseLeave, onOpen }: Props) {
  return (
    <g
      className={`galaxy-core-group ${coreHover ? 'hover' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => emperor && onOpen(emperor.id)}
      style={{ cursor: emperor ? 'pointer' : 'default' }}
    >
      <circle cx={cx} cy={cy} r="72" fill="rgba(0,0,0,0.001)" />
      <circle cx={cx} cy={cy} r="60" className="galaxy-core-glow" />
      <circle cx={cx} cy={cy} r="38" className="galaxy-core-glow" opacity={0.18} />
      <circle cx={cx} cy={cy} r="24" className="galaxy-core" />
      <circle cx={cx} cy={cy} r="4" fill="var(--accent)" />
      <text x={cx} y={cy - 80} className="galaxy-core-label galaxy-core-label-sm">The Astronomican</text>
      <text x={cx} y={cy + 72} className="galaxy-core-label galaxy-core-label-hero">The Emperor</text>
      <text x={cx} y={cy + 92} className="galaxy-core-label galaxy-core-label-sm">Sol · Terra</text>
      {coreHover && (
        <text x={cx} y={cy + 112} className="galaxy-core-label galaxy-core-label-open">
          Open Lexicon →
        </text>
      )}
    </g>
  )
}
