interface GlassIconProps {
  name: string
  a: string
  b: string
  c: string
}

function GlassIcon({ name, a, b, c }: GlassIconProps) {
  const stroke = c
  const fill   = '#0a0a0c'
  const gold   = b
  const halo   = a
  const sw     = 3

  switch (name) {
    case 'skull-and-tears':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill}>
          <circle r="86" fill="none" stroke={gold} strokeWidth="2" opacity="0.6" />
          <circle r="82" fill="none" stroke={gold} strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
          <path d="M -54 -14 C -54 -62 -30 -80 0 -80 C 30 -80 54 -62 54 -14 L 54 12 L 40 24 L 28 24 L 22 36 L 12 36 L 6 44 L -6 44 L -12 36 L -22 36 L -28 24 L -40 24 L -54 12 Z" />
          <ellipse cx="-20" cy="-22" rx="13" ry="15" fill={stroke} />
          <ellipse cx=" 20" cy="-22" rx="13" ry="15" fill={stroke} />
          <path d="M 0 -6 L -5 12 L 0 16 L 5 12 Z" fill={stroke} />
          <line x1="-20" y1="24" x2="20" y2="24" stroke={stroke} strokeWidth="1.5" />
          {Array.from({ length: 5 }, (_, i) => (
            <line key={i} x1={-16 + i * 8} y1="24" x2={-16 + i * 8} y2="34" stroke={stroke} strokeWidth="1" />
          ))}
          <path d="M -22 0 Q -22 18 -14 22 Q -6 18 -6 2" fill={gold} stroke={gold} />
          <path d="M  22 0 Q  22 18  14 22 Q   6 18   6 2" fill={gold} stroke={gold} />
          <path d="M -18 38 Q -18 56 -10 62 Q -2 56 -2 40" fill={gold} stroke={gold} />
        </g>
      )

    case 'chalice':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill}>
          <circle r="88" fill="none" stroke={gold} strokeWidth="1" opacity="0.45" />
          <path d="M -54 -56 L 54 -56 L 48 -40 A 46 46 0 0 1 -48 -40 Z" />
          <path d="M -48 -40 A 48 52 0 0 0 48 -40 L 48 -40 L 8 4 L 8 38 L 30 38 L 30 62 L -30 62 L -30 38 L -8 38 L -8 4 Z" />
          <ellipse cx="0" cy="18" rx="14" ry="4" fill={stroke} />
          <g transform="translate(0 -28)">
            <path d="M 0 -24 L 5 -6 L 22 -4 L 9 6 L 14 22 L 0 12 L -14 22 L -9 6 L -22 -4 L -5 -6 Z" fill={gold} stroke={gold} strokeWidth="1" />
          </g>
          <path d="M -36 -30 Q 0 -10 36 -30" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.6" />
        </g>
      )

    case 'rose-and-sword':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill}>
          <circle r="86" fill="none" stroke={gold} strokeWidth="1" opacity="0.45" />
          <line x1="0" y1="-78" x2="0" y2="84" stroke={stroke} strokeWidth="8" />
          <line x1="0" y1="-78" x2="0" y2="84" stroke={gold} strokeWidth="2" />
          <circle cx="0" cy="-80" r="7" fill={gold} stroke={stroke} />
          <path d="M -34 -56 L 34 -56 L 24 -46 L -24 -46 Z" fill={gold} stroke={stroke} />
          <g transform="translate(0 0)">
            {Array.from({ length: 5 }, (_, i) => {
              const ang = i * 72 - 90
              return <path key={i} d="M 0 -34 Q 26 -26 20 0 Q 0 10 -20 0 Q -26 -26 0 -34 Z" transform={`rotate(${ang})`} fill={halo} stroke={stroke} strokeWidth="1.5" />
            })}
            {Array.from({ length: 5 }, (_, i) => {
              const ang = i * 72 - 54
              return <path key={i} d="M 0 -20 Q 14 -12 10 4 Q 0 8 -10 4 Q -14 -12 0 -20 Z" transform={`rotate(${ang})`} fill={gold} stroke={stroke} strokeWidth="1" />
            })}
            <circle r="5" fill={stroke} />
          </g>
          <path d="M 0 40 L -10 46 M 0 56 L 10 62 M 0 72 L -8 78" stroke={stroke} strokeWidth="2" />
        </g>
      )

    case 'heart-and-thorn':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill}>
          <circle r="88" fill="none" stroke={gold} strokeWidth="1" opacity="0.5" />
          <path d="M 0 62 C -62 20 -70 -32 -36 -52 C -16 -62 -4 -48 0 -30 C 4 -48 16 -62 36 -52 C 70 -32 62 20 0 62 Z" fill={halo} stroke={stroke} strokeWidth="3" />
          {Array.from({ length: 12 }, (_, i) => {
            const ang = (i / 12) * Math.PI * 2 - Math.PI / 2
            const r   = 58
            const x   = Math.cos(ang) * r
            const y   = Math.sin(ang) * (r * 0.95)
            return (
              <g key={i} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(ang * 180 / Math.PI) + 90})`}>
                <path d="M 0 -10 L 4 0 L 0 10 L -4 0 Z" fill={gold} stroke={stroke} strokeWidth="1" />
              </g>
            )
          })}
          <line x1="0" y1="-78" x2="0" y2="74" stroke={stroke} strokeWidth="5" />
          <line x1="0" y1="-78" x2="0" y2="74" stroke={gold} strokeWidth="1.2" />
          <path d="M 0 72 Q -6 84 0 92 Q 6 84 0 72 Z" fill={gold} stroke={stroke} strokeWidth="1" />
        </g>
      )

    case 'shroud':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill}>
          <circle r="88" fill="none" stroke={gold} strokeWidth="1" opacity="0.5" />
          <line x1="-70" y1="-52" x2="70" y2="-52" stroke={stroke} strokeWidth="4" />
          <circle cx="-70" cy="-52" r="4" fill={stroke} />
          <circle cx=" 70" cy="-52" r="4" fill={stroke} />
          <path d="M -64 -50 L -60 30 Q -52 44 -40 34 Q -28 48 -16 34 Q -4 48 8 34 Q 20 48 32 34 Q 44 48 56 34 L 60 30 L 64 -50 Z" fill={halo} stroke={stroke} strokeWidth="2" />
          <path d="M -46 -44 L -40 20 M -24 -44 L -20 28 M 0 -44 L 0 32 M 24 -44 L 20 28 M 46 -44 L 40 20" stroke={stroke} strokeWidth="1" opacity="0.7" fill="none" />
          <g transform="translate(0 -10)">
            <path d="M 0 -18 C 10 -10 14 4 4 10 L 0 10 L -4 10 C -14 4 -10 -10 0 -18 Z" fill={gold} stroke={stroke} strokeWidth="1" />
            <path d="M -18 -4 Q -10 0 -2 8 M 18 -4 Q 10 0 2 8" stroke={gold} strokeWidth="2" fill="none" />
            <line x1="-20" y1="10" x2="20" y2="10" stroke={gold} strokeWidth="2" />
          </g>
        </g>
      )

    case 'rose-bloom':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill}>
          {Array.from({ length: 16 }, (_, i) => {
            const ang = (i / 16) * 360
            return <path key={i} d="M 0 -78 L 3 -58 L -3 -58 Z" transform={`rotate(${ang})`} fill={gold} stroke={gold} strokeWidth="1" opacity={i % 2 ? 0.4 : 0.7} />
          })}
          <circle r="56" fill="none" stroke={gold} strokeWidth="1.2" opacity="0.8" />
          {Array.from({ length: 8 }, (_, i) => {
            const ang = (i / 8) * 360
            return <path key={`o${i}`} d="M 0 -46 Q 22 -36 18 -6 Q 0 2 -18 -6 Q -22 -36 0 -46 Z" transform={`rotate(${ang})`} fill={halo} stroke={stroke} strokeWidth="1.5" />
          })}
          {Array.from({ length: 5 }, (_, i) => {
            const ang = (i / 5) * 360 + 18
            return <path key={`i${i}`} d="M 0 -26 Q 14 -16 10 0 Q 0 6 -10 0 Q -14 -16 0 -26 Z" transform={`rotate(${ang})`} fill={gold} stroke={stroke} strokeWidth="1" />
          })}
          <circle r="7" fill={stroke} />
          <circle r="3" fill={gold} />
          <line x1="0" y1="50" x2="0" y2="92" stroke={stroke} strokeWidth="3" />
          <path d="M 0 64 Q 20 60 30 72 Q 14 74 0 70 Z" fill={halo} stroke={stroke} strokeWidth="1" />
          <path d="M 0 80 Q -20 76 -30 88 Q -14 90 0 86 Z" fill={halo} stroke={stroke} strokeWidth="1" />
        </g>
      )

    default:
      return <circle r="30" fill={fill} stroke={stroke} strokeWidth={sw} />
  }
}

interface StainedGlassProps {
  icon: string
  a: string
  b: string
  c: string
}

export default function StainedGlass({ icon, a, b, c }: StainedGlassProps) {
  const uid = icon
  return (
    <svg viewBox="0 0 600 800" className="glass-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <clipPath id={`arch-${uid}`}>
          <path d="M 40 800 L 40 260 A 260 260 0 0 1 560 260 L 560 800 Z" />
        </clipPath>
        <linearGradient id={`glow-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"    stopColor={a} stopOpacity="1" />
          <stop offset="0.55" stopColor={b} stopOpacity="0.95" />
          <stop offset="1"    stopColor="#000" stopOpacity="1" />
        </linearGradient>
      </defs>

      <rect width="600" height="800" fill="#101014" />
      <g clipPath={`url(#arch-${uid})`}>
        <rect width="600" height="800" fill={`url(#glow-${uid})`} />
        <g transform="translate(300 340)" opacity="0.45">
          {Array.from({ length: 16 }, (_, i) => {
            const ang = (i / 16) * 360
            return (
              <rect key={i} x="-2" y="-260" width="4" height="260"
                fill={c} opacity="0.35" transform={`rotate(${ang})`} />
            )
          })}
          <circle r="130" fill="none" stroke={c} strokeOpacity="0.4" strokeWidth="1" />
          <circle r="70"  fill="none" stroke={c} strokeOpacity="0.4" strokeWidth="1" />
        </g>
        <g transform="translate(300 380)">
          <GlassIcon name={icon} a={a} b={b} c={c} />
        </g>
        <path d="M 40 800 L 40 260 A 260 260 0 0 1 560 260 L 560 800"
          fill="none" stroke="#07070a" strokeWidth="10" />
        <line x1="300" y1="40"  x2="300" y2="800" stroke="#07070a" strokeWidth="6" />
        <line x1="40"  y1="480" x2="560" y2="480" stroke="#07070a" strokeWidth="6" />
        <line x1="40"  y1="640" x2="560" y2="640" stroke="#07070a" strokeWidth="4" />
        <g transform="translate(300 180)" fill="none" stroke="#07070a" strokeWidth="5">
          <circle r="70" />
        </g>
      </g>
      <path
        d="M 40 800 L 40 260 A 260 260 0 0 1 560 260 L 560 800 L 540 800 L 540 260 A 240 240 0 0 0 60 260 L 60 800 Z"
        fill="#08080a"
      />
    </svg>
  )
}
