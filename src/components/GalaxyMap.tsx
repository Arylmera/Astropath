import { useMemo, useState } from 'react'
import type { Primarch } from '@/data/types'

interface Props {
  primarchs: Primarch[]
  onOpen: (id: string) => void
}

const W = 1200, H = 700
const cx = 640, cy = 350
const r1 = 160, r2 = 300

export default function GalaxyMap({ primarchs: allPrimarchs, onOpen }: Props) {
  const primarchs = useMemo(() => allPrimarchs.filter(p => !p.isEmperor), [allPrimarchs])
  const emperor   = useMemo(() => allPrimarchs.find(p => p.isEmperor),    [allPrimarchs])

  const [hoveredId, setHoveredId]   = useState<string | null>(null)
  const [focusedId, setFocusedId]   = useState<string | null>(primarchs[0]?.id ?? null)
  const [coreHover, setCoreHover]   = useState(false)

  const active = hoveredId ?? focusedId
  const focus  = primarchs.find(p => p.id === active) ?? null

  const ordered = useMemo(() => {
    const loyal   = primarchs.filter(p => p.allegiance === 'Loyalist')
    const traitor = primarchs.filter(p => p.allegiance === 'Traitor')
    const out: Primarch[] = []
    const n = Math.max(loyal.length, traitor.length)
    for (let i = 0; i < n; i++) {
      if (loyal[i])   out.push(loyal[i])
      if (traitor[i]) out.push(traitor[i])
    }
    return out
  }, [primarchs])

  interface Node {
    p: Primarch
    x: number
    y: number
    ring: number
    angle: number
    labelDY?: number
  }

  const positions = useMemo<Node[]>(() => {
    const inner = ordered.slice(0, 5)
    const outer = ordered.slice(5)
    const nodes: Node[] = []

    inner.forEach((p, i) => {
      const angle = (i / inner.length) * Math.PI * 2 - Math.PI / 2 + 0.3
      nodes.push({ p, x: cx + Math.cos(angle) * r1, y: cy + Math.sin(angle) * r1, ring: 1, angle })
    })
    outer.forEach((p, i) => {
      const angle = (i / outer.length) * Math.PI * 2 - Math.PI / 2 - 0.1
      nodes.push({ p, x: cx + Math.cos(angle) * r2, y: cy + Math.sin(angle) * r2, ring: 2, angle })
    })

    const MIN_DY = 34
    ;(['left', 'right'] as const).forEach(side => {
      const same = nodes
        .map(n => ({ n, side: n.x > cx ? 'right' : 'left' }))
        .filter(e => e.side === side)
        .sort((a, b) => a.n.y - b.n.y)
      for (let k = 1; k < same.length; k++) {
        const prev = same[k - 1].n
        const cur  = same[k].n
        const prevY = prev.y + (prev.labelDY ?? 0)
        const curY  = cur.y  + (cur.labelDY  ?? 0)
        if (curY - prevY < MIN_DY) {
          cur.labelDY = (cur.labelDY ?? 0) + (MIN_DY - (curY - prevY))
        }
      }
    })
    return nodes
  }, [ordered])

  const stars = useMemo(() => {
    const arr: { x: number; y: number; r: number; o: number }[] = []
    let seed = 42
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
    for (let i = 0; i < 120; i++) {
      arr.push({ x: rand() * W, y: rand() * H, r: rand() * 0.8 + 0.2, o: rand() * 0.5 + 0.2 })
    }
    return arr
  }, [])

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
          {stars.map((s, i) => (
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

          <g
            className={`galaxy-core-group ${coreHover ? 'hover' : ''}`}
            onMouseEnter={() => setCoreHover(true)}
            onMouseLeave={() => setCoreHover(false)}
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

          {positions.map(({ x, y, p, labelDY }) => {
            const isActive  = active === p.id
            const labelSide = x > cx ? 'right' : 'left'
            const labelX    = x + (labelSide === 'right' ? 18 : -18)
            const labelY    = y + (labelDY ?? 0)
            const anchor    = labelSide === 'right' ? 'start' : 'end'
            const cls       = p.allegiance === 'Loyalist' ? 'loyal' : 'traitor'
            return (
              <g key={p.id}
                className={`galaxy-node ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => { setFocusedId(p.id); setHoveredId(null) }}
                onClick={() => onOpen(p.id)}
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
          })}
        </svg>

        {focus && (
          <aside className="galaxy-focus visible">
            <div className="galaxy-focus-num">Primarch · {focus.num}</div>
            <h2 className="galaxy-focus-name">{focus.name}</h2>
            <div className="galaxy-focus-epithet">"{focus.epithet}"</div>
            <div className="galaxy-focus-meta">
              <div>
                <div className="label">Legion</div>
                <div className="value">{focus.legion}</div>
              </div>
              <div>
                <div className="label">Homeworld</div>
                <div className="value">{focus.homeworld}</div>
              </div>
              <div>
                <div className="label">Allegiance</div>
                <div className="value" style={{
                  color: focus.allegiance === 'Loyalist' ? 'var(--loyal)' : 'var(--traitor)'
                }}>
                  {focus.allegiance}
                </div>
              </div>
              <div>
                <div className="label">Status</div>
                <div className="value">{focus.status}</div>
              </div>
            </div>
            <button className="galaxy-focus-open" onClick={() => onOpen(focus.id)}>
              Open Lexicon →
            </button>
          </aside>
        )}

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
