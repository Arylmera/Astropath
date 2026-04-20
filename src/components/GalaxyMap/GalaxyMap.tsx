import { useMemo, useState } from 'react'
import type { Primarch } from '@/data/types'
import { W, H, cx, cy, r1, r2, generateStars, interleaveByAllegiance, computePositions } from './utils'
import GalaxyCore from './GalaxyCore'
import GalaxyNode from './GalaxyNode'
import GalaxyFocusPanel from './GalaxyFocusPanel'

interface Props {
  primarchs: Primarch[]
  onOpen: (id: string) => void
}

const STARS = generateStars()

export default function GalaxyMap({ primarchs: allPrimarchs, onOpen }: Props) {
  const primarchs = useMemo(() => allPrimarchs.filter(p => !p.isEmperor), [allPrimarchs])
  const emperor   = useMemo(() => allPrimarchs.find(p => p.isEmperor),    [allPrimarchs])

  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [focusedId, setFocusedId] = useState<string | null>(primarchs[0]?.id ?? null)
  const [coreHover, setCoreHover] = useState(false)

  const active = hoveredId ?? focusedId
  const focus  = primarchs.find(p => p.id === active) ?? null

  const ordered   = useMemo(() => interleaveByAllegiance(primarchs), [primarchs])
  const positions = useMemo(() => computePositions(ordered), [ordered])

  const loyalCount   = primarchs.filter(p => p.allegiance === 'Loyalist').length
  const traitorCount = primarchs.filter(p => p.allegiance === 'Traitor').length

  return (
    <div className="galaxy">
      <header className="galaxy-header">
        <div>
          <h1 className="galaxy-title">
            The Twenty<br /><em>Primarchs</em>
          </h1>
        </div>
        <p className="galaxy-sub">
          A navigational chart of the Emperor's gene-sons — their worlds, their Legions, and the paths they took into history.
        </p>
        <div className="galaxy-stats">
          <div>
            <div className="value">{primarchs.length}</div>
            <div className="label">On record</div>
          </div>
          <div>
            <div className="value" style={{ color: 'var(--loyal)' }}>{loyalCount}</div>
            <div className="label">Loyalist</div>
          </div>
          <div>
            <div className="value" style={{ color: 'var(--traitor)' }}>{traitorCount}</div>
            <div className="label">Traitor</div>
          </div>
        </div>
      </header>

      <div className="galaxy-stage">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          {STARS.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r}
              fill="currentColor" opacity={s.o}
              style={{ color: 'var(--text-muted)' }} />
          ))}

          <circle cx={cx} cy={cy} r={r1} className="galaxy-orbit" />
          <circle cx={cx} cy={cy} r={r2} className="galaxy-orbit" />
          <circle cx={cx} cy={cy} r={r2 + 50} className="galaxy-orbit" opacity={0.15} />

          {positions.map(({ x, y, p }) => (
            <line key={`s-${p.id}`} x1={cx} y1={cy} x2={x} y2={y}
              className="galaxy-spoke"
              strokeWidth={active === p.id ? 1 : 0.5}
              opacity={active === p.id ? 0.6 : 0.15} />
          ))}

          <GalaxyCore
            emperor={emperor}
            coreHover={coreHover}
            onMouseEnter={() => setCoreHover(true)}
            onMouseLeave={() => setCoreHover(false)}
            onOpen={onOpen}
          />

          {positions.map(node => (
            <GalaxyNode
              key={node.p.id}
              node={node}
              isActive={active === node.p.id}
              onMouseEnter={() => setHoveredId(node.p.id)}
              onMouseLeave={() => { setFocusedId(node.p.id); setHoveredId(null) }}
              onClick={() => onOpen(node.p.id)}
            />
          ))}
        </svg>

        <GalaxyFocusPanel focus={focus} onOpen={onOpen} />

        <div className="galaxy-legend">
          <div className="galaxy-legend-row">
            <span className="galaxy-legend-dot" style={{ background: 'var(--loyal)' }} />
            Loyalist
          </div>
          <div className="galaxy-legend-row">
            <span className="galaxy-legend-dot" style={{ background: 'var(--traitor)' }} />
            Traitor / Lost
          </div>
        </div>

        <div className="galaxy-hint">Hover a node · click to focus · open lexicon</div>
      </div>
    </div>
  )
}
