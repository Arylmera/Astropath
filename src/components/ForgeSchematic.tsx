interface Props {
  seed: string
  label: string
}

export default function ForgeSchematic({ seed, label }: Props) {
  const hash = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7)
  const rand = (n: number) => {
    const x = Math.sin(hash + n * 97) * 10000
    return x - Math.floor(x)
  }

  const cogTeeth = 24
  const innerR = 170, outerR = 210
  const cogPath: string[] = []
  for (let i = 0; i < cogTeeth * 2; i++) {
    const a = (i / (cogTeeth * 2)) * Math.PI * 2
    const r = i % 2 === 0 ? outerR : innerR
    const x = 300 + Math.cos(a) * r
    const y = 300 + Math.sin(a) * r
    cogPath.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  cogPath.push('Z')

  const nodes = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 + rand(i) * 0.3
    return { x: 300 + Math.cos(a) * 260, y: 300 + Math.sin(a) * 260 }
  })

  const gradId = `fg-${seed}`
  const gridId = `fg-grid-${seed}`

  return (
    <svg viewBox="0 0 600 600" className="forge-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={gradId} cx="50%" cy="40%" r="70%">
          <stop offset="0" stopColor="var(--forge-glow)" />
          <stop offset="1" stopColor="var(--forge-dark)" />
        </radialGradient>
        <pattern id={gridId} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--forge-line)" strokeWidth="0.5" opacity="0.18" />
        </pattern>
      </defs>

      <rect width="600" height="600" fill={`url(#${gradId})`} />
      <rect width="600" height="600" fill={`url(#${gridId})`} />
      <circle cx="300" cy="300" r="280" fill="none" stroke="var(--forge-line)" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.4" />
      <circle cx="300" cy="300" r="230" fill="none" stroke="var(--forge-line)" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.4" />

      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        return (
          <line key={i}
            x1={300 + Math.cos(a) * 115} y1={300 + Math.sin(a) * 115}
            x2={300 + Math.cos(a) * 280} y2={300 + Math.sin(a) * 280}
            stroke="var(--forge-line)" strokeWidth="0.5" opacity="0.25"
          />
        )
      })}

      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="10" fill="none" stroke="var(--forge-line)" strokeWidth="1" opacity="0.6" />
          <circle cx={n.x} cy={n.y} r="3" fill="var(--forge-line)" />
        </g>
      ))}

      <path d={cogPath.join(' ')} fill="var(--forge-cog)" stroke="var(--forge-line)" strokeWidth="1.5" />
      <circle cx="300" cy="300" r="130" fill="var(--forge-cog-inner)" stroke="var(--forge-line)" strokeWidth="1" />
      <circle cx="300" cy="300" r="60" fill="none" stroke="var(--forge-line)" strokeWidth="0.75" opacity="0.6" />

      <g transform="translate(300 300)">
        <circle r="42" fill="var(--forge-line)" opacity="0.12" />
        <path
          d="M -26 -8 a 26 28 0 1 1 52 0 v 18 l -8 6 h -10 l -4 8 h -8 l -4 -8 h -10 l -8 -6 z"
          fill="var(--forge-cog)" stroke="var(--forge-line)" strokeWidth="1.2"
        />
        <circle cx="-10" cy="-4" r="5" fill="var(--forge-dark)" />
        <circle cx="10"  cy="-4" r="5" fill="var(--forge-dark)" />
      </g>

      <g transform="translate(300 540)">
        <rect x="-150" y="-18" width="300" height="32" fill="var(--forge-cog)" stroke="var(--forge-line)" strokeWidth="0.75" />
        <text textAnchor="middle" y="4"
          fontFamily="'JetBrains Mono', monospace"
          fontSize="14" letterSpacing="4" fill="var(--forge-line)">
          {label.toUpperCase()}
        </text>
      </g>
    </svg>
  )
}
