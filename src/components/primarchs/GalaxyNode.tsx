import type { Node } from './galaxyUtils'
import { cx } from './galaxyUtils'

interface Props {
  node: Node
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

export default function GalaxyNode({ node, isActive, onMouseEnter, onMouseLeave, onClick }: Props) {
  const { p, x, y, labelDY } = node
  const labelSide = x > cx ? 'right' : 'left'
  const labelX    = x + (labelSide === 'right' ? 18 : -18)
  const labelY    = y + (labelDY ?? 0)
  const anchor    = labelSide === 'right' ? 'start' : 'end'
  const cls       = p.allegiance === 'Loyalist' ? 'loyal' : 'traitor'

  return (
    <g
      className={`galaxy-node ${isActive ? 'active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <circle cx={x} cy={y} r="14" className="galaxy-node-ring" />
      <circle cx={x} cy={y} r={isActive ? 7 : 5} className={`galaxy-node-dot ${cls}`} />
      <text x={labelX} y={labelY - 2} textAnchor={anchor} className="galaxy-node-label">
        {p.name}
      </text>
      <text x={labelX} y={labelY + 11} textAnchor={anchor} className="galaxy-node-sub">
        {p.num} · {p.legion}
      </text>
    </g>
  )
}
