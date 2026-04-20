import { useState, useMemo } from 'react'
import type { Forge } from '@/data/types'

// ---- MechanicalCog ---------------------------------------------------------

interface CogProps {
  teeth: number
  outer: number
  inner: number
  small?: boolean
  cogFill?: string
  innerFill?: string
}

export function MechanicalCog({ teeth, outer, inner, small, cogFill, innerFill }: CogProps) {
  const path: string[] = []
  const step      = (Math.PI * 2) / teeth
  const toothHalf = step * 0.26
  const tipShrink = 0.35

  for (let i = 0; i < teeth; i++) {
    const a      = i * step - Math.PI / 2
    const aBaseL = a - toothHalf
    const aBaseR = a + toothHalf
    const aTipL  = a - toothHalf * (1 - tipShrink)
    const aTipR  = a + toothHalf * (1 - tipShrink)

    const bl = [Math.cos(aBaseL) * inner, Math.sin(aBaseL) * inner]
    const tl = [Math.cos(aTipL)  * outer, Math.sin(aTipL)  * outer]
    const tr = [Math.cos(aTipR)  * outer, Math.sin(aTipR)  * outer]
    const br = [Math.cos(aBaseR) * inner, Math.sin(aBaseR) * inner]

    if (i === 0) path.push(`M${bl[0].toFixed(1)},${bl[1].toFixed(1)}`)
    else         path.push(`L${bl[0].toFixed(1)},${bl[1].toFixed(1)}`)
    path.push(`L${tl[0].toFixed(1)},${tl[1].toFixed(1)}`)
    path.push(`L${tr[0].toFixed(1)},${tr[1].toFixed(1)}`)
    path.push(`L${br[0].toFixed(1)},${br[1].toFixed(1)}`)

    const nextBaseL = (i + 1) * step - Math.PI / 2 - toothHalf
    const nx = Math.cos(nextBaseL) * inner
    const ny = Math.sin(nextBaseL) * inner
    path.push(`A${inner},${inner} 0 0 1 ${nx.toFixed(1)},${ny.toFixed(1)}`)
  }
  path.push('Z')

  const fill = cogFill  ?? 'var(--mech-cog)'
  const core = innerFill ?? 'var(--mech-cog-inner)'
  const line = 'var(--mech-line)'

  if (small) {
    return (
      <g>
        <path d={path.join(' ')} fill={fill} stroke={line} strokeWidth="1" />
        <circle r={outer * 0.55} fill={core} stroke={line} strokeWidth="0.75" />
        <circle r={outer * 0.22} fill={line} />
      </g>
    )
  }

  const boltR  = inner * 0.78
  const bolts  = 6
  const spokes = 6
  const hubR   = inner * 0.4

  return (
    <g>
      <path d={path.join(' ')} fill={fill} stroke={line} strokeWidth="1.5" />
      <circle r={inner}      fill="none" stroke={line} strokeWidth="0.5" opacity="0.5" />
      <circle r={inner - 10} fill="none" stroke={line} strokeWidth="0.5" opacity="0.35" />

      {Array.from({ length: bolts }, (_, i) => {
        const a = (i / bolts) * Math.PI * 2 + Math.PI / bolts
        const x = Math.cos(a) * boltR
        const y = Math.sin(a) * boltR
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="9"   fill={core} stroke={line} strokeWidth="0.75" />
            <circle cx={x} cy={y} r="3.5" fill={line} />
            <line x1={x - 5} y1={y}     x2={x + 5} y2={y}     stroke={core} strokeWidth="1" />
            <line x1={x}     y1={y - 5} x2={x}     y2={y + 5} stroke={core} strokeWidth="1" />
          </g>
        )
      })}

      <circle r={hubR + 18} fill={core} stroke={line} strokeWidth="0.75" />

      {Array.from({ length: spokes }, (_, i) => {
        const a  = (i / spokes) * Math.PI * 2
        const x1 = Math.cos(a) * (hubR + 2)
        const y1 = Math.sin(a) * (hubR + 2)
        const x2 = Math.cos(a) * (hubR + 16)
        const y2 = Math.sin(a) * (hubR + 16)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={line} strokeWidth="0.75" opacity="0.7" />
      })}

      <circle r={hubR}     fill="var(--mech-bg)" stroke={line} strokeWidth="1.2" />
      <circle r={hubR - 6} fill="none"           stroke={line} strokeWidth="0.5" opacity="0.5" />

      <g transform={`scale(${hubR / 52})`}>
        <path d="M -30 -10 a 30 32 0 1 1 60 0 v 22 l -10 8 h -10 l -4 8 h -10 l -4 -8 h -10 l -10 -8 z"
          fill="var(--mech-bg)" stroke={line} strokeWidth="1" />
        <g transform="translate(-12 -4)">
          <circle r="6"   fill={line} />
          <circle r="2.2" fill="var(--mech-bg)" />
          {Array.from({ length: 6 }, (_, k) => (
            <rect key={k} x="-1.2" y="-7" width="2.4" height="2"
              fill={line} transform={`rotate(${k * 60})`} />
          ))}
        </g>
        <g transform="translate(12 -4)">
          <circle r="5" fill={line} />
          <circle r="2" fill="var(--mech-bg)" />
        </g>
        <path d="M -30 6 q -18 8 -22 28 M 30 6 q 18 8 22 28"
          fill="none" stroke={line} strokeWidth="1" opacity="0.8" />
        <circle cx="-50" cy="32" r="2" fill={line} />
        <circle cx="50"  cy="32" r="2" fill={line} />
      </g>
    </g>
  )
}

// ---- MechanicusArchive -----------------------------------------------------

interface ArchiveProps {
  forges: Forge[]
  onOpen: (id: string) => void
}

export default function MechanicusArchive({ forges, onOpen }: ArchiveProps) {
  const [hoverId, setHover] = useState<string | null>(null)
  const hovered = useMemo(() => forges.find(f => f.id === hoverId) ?? null, [hoverId, forges])

  const n = forges.length
  const R = 310

  const positions = forges.map((f, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    return { id: f.id, x: Math.cos(a) * R, y: Math.sin(a) * R, a }
  })

  return (
    <div className="view mechanicus-view">
      <div className="mech-header">
        <div className="mech-header-kicker">
          <span className="mech-cog-sm">⚙</span>
          <span>Archive · Adeptus Mechanicus</span>
        </div>
        <h1>Forge Worlds of the Omnissiah</h1>
        <p className="mech-header-lede">
          Seven principal foundries whose god-engines and pattern-blades arm the Imperium.
          Select a forge to unseal its schematic.
        </p>
      </div>

      <div className="mech-stage">
        <svg className="mech-diagram" viewBox="-400 -400 800 800" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="mech-bg" cx="50%" cy="50%" r="50%">
              <stop offset="0"   stopColor="var(--mech-glow)" stopOpacity="1" />
              <stop offset="0.7" stopColor="var(--mech-bg)"   stopOpacity="1" />
              <stop offset="1"   stopColor="var(--mech-bg)"   stopOpacity="1" />
            </radialGradient>
            <pattern id="mech-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--mech-line)" strokeWidth="0.6" opacity="0.25" />
            </pattern>
          </defs>

          <circle r="380" fill="url(#mech-bg)" />
          <circle r="360" fill="none" stroke="var(--mech-line)" strokeWidth="0.5" opacity="0.25" strokeDasharray="2 6" />
          <circle r="340" fill="none" stroke="var(--mech-line)" strokeWidth="0.5" opacity="0.35" />
          <circle r="310" fill="none" stroke="var(--mech-line)" strokeWidth="0.5" opacity="0.35" />
          <circle r="240" fill="none" stroke="var(--mech-line)" strokeWidth="0.5" opacity="0.25" strokeDasharray="1 4" />

          {Array.from({ length: n }, (_, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2
            return (
              <line key={i}
                x1={Math.cos(a) * 160} y1={Math.sin(a) * 160}
                x2={Math.cos(a) * 310} y2={Math.sin(a) * 310}
                stroke="var(--mech-line)" strokeWidth="0.5" opacity="0.35" />
            )
          })}

          <MechanicalCog teeth={24} outer={170} inner={148} />

          {positions.map((pos, i) => {
            const forge   = forges[i]
            const isHover = hoverId === forge.id
            return (
              <g key={forge.id}
                className={`mech-node ${isHover ? 'hover' : ''}`}
                transform={`translate(${pos.x} ${pos.y})`}
                onMouseEnter={() => setHover(forge.id)}
                onMouseLeave={() => setHover(h => h === forge.id ? null : h)}
                onClick={() => onOpen(forge.id)}
              >
                <circle r="36" fill="none" stroke="var(--mech-line)" strokeWidth="0.5" opacity="0.5" />
                <circle r="40" fill="rgba(0,0,0,0.001)" />
                <MechanicalCog teeth={10} outer={22} inner={18} small
                  cogFill={isHover ? 'var(--mech-line)' : 'var(--mech-cog)'}
                  innerFill={isHover ? 'var(--mech-cog-inner)' : 'var(--mech-bg)'} />
                <line x1="0" y1="0"
                  x2={Math.cos(pos.a) * 56} y2={Math.sin(pos.a) * 56}
                  stroke="var(--mech-line)" strokeWidth="0.5" opacity="0.7" />
                <g transform={`translate(${Math.cos(pos.a) * 70} ${Math.sin(pos.a) * 70})`}>
                  <text
                    textAnchor={Math.cos(pos.a) > 0.2 ? 'start' : Math.cos(pos.a) < -0.2 ? 'end' : 'middle'}
                    dominantBaseline="middle"
                    fontFamily="'Space Grotesk', sans-serif"
                    fontWeight="600" fontSize="15" letterSpacing="1"
                    fill="var(--mech-label)"
                  >
                    {forge.name.toUpperCase()}
                  </text>
                  <text
                    textAnchor={Math.cos(pos.a) > 0.2 ? 'start' : Math.cos(pos.a) < -0.2 ? 'end' : 'middle'}
                    dominantBaseline="middle" dy="18"
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="10" letterSpacing="2"
                    fill="var(--mech-label-dim)"
                  >
                    SEG. {forge.segmentum.toUpperCase()}
                  </text>
                </g>
              </g>
            )
          })}
        </svg>

        {hovered && (
          <div className="mech-focus show">
            <div className="mech-focus-kicker">FORGE WORLD</div>
            <h2>{hovered.name}</h2>
            <p className="mech-focus-epithet">"{hovered.epithet}"</p>
            <div className="mech-focus-grid">
              <div><span>Titan Legion</span><b>{hovered.titanLegion}</b></div>
              <div><span>Primacy</span><b>{hovered.primacy}</b></div>
              <div><span>Dogma</span><b>{hovered.dogma}</b></div>
              <div><span>Segmentum</span><b>{hovered.segmentum}</b></div>
            </div>
            <button className="mech-focus-open" onClick={() => onOpen(hovered.id)}>
              Open Schematic ↗
            </button>
          </div>
        )}

        <div className="mech-hint">
          Hover a forge node · click to open the schematic · <a href="https://github.com/Arylmera/astropath" target="_blank" rel="noopener noreferrer" className="mech-hint-link">github.com/Arylmera/astropath</a>
        </div>
      </div>
    </div>
  )
}
