import { useId } from 'react'

type GlassColors = {
  halo: string
  gold: string
  stroke: string
}

interface GlassIconProps extends GlassColors {
  name: string
}

function GlassIcon({ name, halo, gold, stroke }: GlassIconProps) {
  const fill = '#0a0a0c'
  const sw   = 3

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

    case 'flaming-heart':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill}>
          <circle r="88" fill="none" stroke={gold} strokeWidth="1" opacity="0.5" />
          <path d="M 0 -80 C -6 -60 -28 -52 -20 -28 C -14 -10 -4 -18 0 -24 C 4 -18 14 -10 20 -28 C 28 -52 6 -60 0 -80 Z" fill={gold} stroke={gold} strokeWidth="1.5" />
          <path d="M -24 -62 C -30 -46 -44 -40 -38 -20 C -34 -8 -26 -14 -24 -22 C -20 -10 -10 -4 -8 -20 C -4 -44 -18 -50 -24 -62 Z" fill={halo} stroke={stroke} strokeWidth="1" opacity="0.85" />
          <path d="M 24 -62 C 30 -46 44 -40 38 -20 C 34 -8 26 -14 24 -22 C 20 -10 10 -4 8 -20 C 4 -44 18 -50 24 -62 Z" fill={halo} stroke={stroke} strokeWidth="1" opacity="0.85" />
          <path d="M 0 68 C -66 22 -74 -28 -38 -48 C -18 -58 -4 -44 0 -28 C 4 -44 18 -58 38 -48 C 74 -28 66 22 0 68 Z" fill={halo} stroke={stroke} strokeWidth="3" />
          <line x1="0" y1="-14" x2="0" y2="36" stroke={gold} strokeWidth="2.5" opacity="0.7" />
          <line x1="-22" y1="8" x2="22" y2="8" stroke={gold} strokeWidth="2.5" opacity="0.7" />
          {Array.from({ length: 6 }, (_, i) => {
            const ang = (i / 6) * Math.PI - Math.PI
            const r = 74
            return <circle key={i} cx={Math.cos(ang) * r} cy={Math.sin(ang) * r * 0.6 - 10} r="3" fill={gold} stroke="none" opacity="0.6" />
          })}
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

    case 'aquila':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill}>
          <circle r="88" fill="none" stroke={gold} strokeWidth="1" opacity="0.5" />
          <path d="M -8 -12 C -28 -24 -62 -20 -80 -44 C -66 -56 -46 -50 -30 -38 C -46 -60 -38 -72 -18 -60 C -26 -78 -8 -82 -8 -60 L -8 -12 Z" fill={halo} stroke={stroke} strokeWidth={sw} />
          <path d="M -10 14 C -32 16 -64 28 -74 54 C -58 60 -38 52 -22 40 C -38 62 -28 74 -12 58 L -10 14 Z" fill={halo} stroke={stroke} strokeWidth={sw} opacity="0.85" />
          <g transform="scale(-1 1)">
            <path d="M -8 -12 C -28 -24 -62 -20 -80 -44 C -66 -56 -46 -50 -30 -38 C -46 -60 -38 -72 -18 -60 C -26 -78 -8 -82 -8 -60 L -8 -12 Z" fill={halo} stroke={stroke} strokeWidth={sw} />
            <path d="M -10 14 C -32 16 -64 28 -74 54 C -58 60 -38 52 -22 40 C -38 62 -28 74 -12 58 L -10 14 Z" fill={halo} stroke={stroke} strokeWidth={sw} opacity="0.85" />
          </g>
          <path d="M -10 -20 L 0 -50 L 10 -20 L 12 30 L 0 52 L -12 30 Z" />
          <path d="M -10 -42 C -14 -58 -28 -64 -30 -52 C -26 -40 -14 -38 -10 -46 Z" fill={gold} stroke={gold} strokeWidth="1.5" />
          <path d="M -30 -52 L -42 -46 L -34 -42 Z" fill={gold} stroke={gold} strokeWidth="1" />
          <g transform="scale(-1 1)">
            <path d="M -10 -42 C -14 -58 -28 -64 -30 -52 C -26 -40 -14 -38 -10 -46 Z" fill={gold} stroke={gold} strokeWidth="1.5" />
            <path d="M -30 -52 L -42 -46 L -34 -42 Z" fill={gold} stroke={gold} strokeWidth="1" />
          </g>
          <path d="M -12 46 L -16 66 L -6 60 L -10 76 L 0 68 L 10 76 L 6 60 L 16 66 L 12 46 Z" />
          <path d="M -8 -8 L 0 -20 L 8 -8 L 6 10 L 0 16 L -6 10 Z" fill={gold} stroke={stroke} strokeWidth="1" />
        </g>
      )

    case 'crown':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill}>
          <circle r="88" fill="none" stroke={gold} strokeWidth="1" opacity="0.5" />
          <rect x="-60" y="0" width="120" height="30" />
          <path d="M -8 0 L 0 -62 L 8 0 Z" fill={halo} stroke={stroke} strokeWidth="2" />
          <path d="M -26 0 L -20 -42 L -14 0 Z" fill={halo} stroke={stroke} strokeWidth="1.5" />
          <path d="M 14 0 L 20 -42 L 26 0 Z" fill={halo} stroke={stroke} strokeWidth="1.5" />
          <path d="M -50 0 L -44 -24 L -38 0 Z" fill={halo} stroke={stroke} strokeWidth="1.5" />
          <path d="M 38 0 L 44 -24 L 50 0 Z" fill={halo} stroke={stroke} strokeWidth="1.5" />
          <rect x="-60" y="0" width="120" height="6" fill={gold} stroke="none" />
          <rect x="-60" y="24" width="120" height="6" fill={gold} stroke="none" />
          <circle cx="0" cy="13" r="7" fill={gold} stroke={stroke} strokeWidth="1.5" />
          <circle cx="-28" cy="13" r="5" fill={halo} stroke={stroke} strokeWidth="1" />
          <circle cx="28" cy="13" r="5" fill={halo} stroke={stroke} strokeWidth="1" />
          <circle cx="-50" cy="13" r="4" fill={gold} stroke={stroke} strokeWidth="1" />
          <circle cx="50" cy="13" r="4" fill={gold} stroke={stroke} strokeWidth="1" />
          <circle cx="0" cy="-58" r="9" fill={gold} stroke={stroke} strokeWidth="2" />
          <circle cx="0" cy="-58" r="5" fill={halo} stroke="none" />
        </g>
      )

    case 'lance':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill}>
          <circle r="88" fill="none" stroke={gold} strokeWidth="1" opacity="0.5" />
          <rect x="-3" y="-34" width="6" height="118" fill={stroke} />
          <line x1="0" y1="-34" x2="0" y2="84" stroke={gold} strokeWidth="1.5" opacity="0.7" />
          <path d="M 0 -84 L -14 -48 L 0 -34 L 14 -48 Z" fill={halo} stroke={stroke} strokeWidth="2" />
          <line x1="0" y1="-84" x2="0" y2="-34" stroke={gold} strokeWidth="1" opacity="0.6" />
          <path d="M -40 -22 L -8 -20 L -8 -16 L -40 -18 Z" fill={gold} stroke={stroke} strokeWidth="1.5" />
          <circle cx="-40" cy="-20" r="5" fill={gold} stroke={stroke} strokeWidth="1" />
          <path d="M 40 -22 L 8 -20 L 8 -16 L 40 -18 Z" fill={gold} stroke={stroke} strokeWidth="1.5" />
          <circle cx="40" cy="-20" r="5" fill={gold} stroke={stroke} strokeWidth="1" />
          {[0, 12, 24, 36, 48].map((y) => (
            <rect key={y} x="-5" y={y} width="10" height="5" rx="1" fill={gold} opacity="0.55" stroke="none" />
          ))}
          <path d="M -8 72 L 0 86 L 8 72 L 6 64 L -6 64 Z" fill={gold} stroke={stroke} strokeWidth="1.5" />
        </g>
      )

    case 'silence':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill}>
          <circle r="88" fill="none" stroke={gold} strokeWidth="1" opacity="0.5" />
          <path d="M -56 -8 C -38 -30 -14 -36 0 -28 C 14 -36 38 -30 56 -8 Q 28 -4 0 -2 Q -28 -4 -56 -8 Z" fill={halo} stroke={stroke} strokeWidth="2" />
          <path d="M -56 -8 Q -28 -4 0 -2 Q 28 -4 56 -8 C 50 20 28 38 0 40 C -28 38 -50 20 -56 -8 Z" fill={halo} stroke={stroke} strokeWidth="2" />
          <path d="M -56 -8 Q 0 -2 56 -8" fill="none" stroke={gold} strokeWidth="2" />
          {([[-38,-20,4],[-19,-22,6],[0,-22,8],[19,-22,6],[38,-20,4]] as const).map(([x,y1,y2]) => (
            <line key={x} x1={x} y1={y1} x2={x} y2={y2} stroke={gold} strokeWidth="2.5" />
          ))}
        </g>
      )

    case 'warrior-saint':
      return (
        <g stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill}>
          <circle r="88" fill="none" stroke={gold} strokeWidth="1" opacity="0.5" />
          <path d="M 0 -88 C -5 -78 -10 -66 0 -60 C 10 -66 5 -78 0 -88 Z" fill={gold} stroke={gold} strokeWidth="1.5" />
          <path d="M -4 -76 C -18 -82 -28 -70 -18 -62 C -14 -58 -8 -64 -6 -70 C -4 -62 -1 -62 0 -60 Z" fill={gold} stroke={gold} strokeWidth="1" />
          <path d="M  4 -76 C  18 -82  28 -70  18 -62 C  14 -58   8 -64   6 -70 C   4 -62   1 -62   0 -60 Z" fill={gold} stroke={gold} strokeWidth="1" />
          <rect x="-5" y="-60" width="10" height="8" rx="2" fill={gold} stroke={stroke} strokeWidth="1" />
          <g>
            <path d="M -6 -30 C -26 -44 -62 -38 -82 -48 C -70 -30 -46 -26 -30 -22 C -54 -14 -72 0 -74 12 C -54 12 -34 2 -18 8 C -36 18 -50 34 -48 46 C -30 38 -14 22 -6 10 Z" fill={halo} stroke={stroke} strokeWidth="2" />
            <path d="M -6 -30 C -26 -36 -52 -30 -66 -40" fill="none" stroke={gold} strokeWidth="1" opacity="0.55" />
            <path d="M -10 -8 C -28 -10 -50 -4 -60 6"   fill="none" stroke={gold} strokeWidth="1" opacity="0.55" />
            <path d="M -14 12 C -28 16 -40 28 -42 38"   fill="none" stroke={gold} strokeWidth="1" opacity="0.45" />
          </g>
          <g transform="scale(-1 1)">
            <path d="M -6 -30 C -26 -44 -62 -38 -82 -48 C -70 -30 -46 -26 -30 -22 C -54 -14 -72 0 -74 12 C -54 12 -34 2 -18 8 C -36 18 -50 34 -48 46 C -30 38 -14 22 -6 10 Z" fill={halo} stroke={stroke} strokeWidth="2" />
            <path d="M -6 -30 C -26 -36 -52 -30 -66 -40" fill="none" stroke={gold} strokeWidth="1" opacity="0.55" />
            <path d="M -10 -8 C -28 -10 -50 -4 -60 6"   fill="none" stroke={gold} strokeWidth="1" opacity="0.55" />
            <path d="M -14 12 C -28 16 -40 28 -42 38"   fill="none" stroke={gold} strokeWidth="1" opacity="0.45" />
          </g>
          <path d="M -18 -28 L -26 -14 L -26 24 L 26 24 L 26 -14 L 18 -28 Z" />
          <path d="M -18 -28 L -34 -20 L -34 -8 L -26 -8 L -26 -14 Z" fill={halo} stroke={stroke} strokeWidth="1.5" />
          <g transform="scale(-1 1)">
            <path d="M -18 -28 L -34 -20 L -34 -8 L -26 -8 L -26 -14 Z" fill={halo} stroke={stroke} strokeWidth="1.5" />
          </g>
          <ellipse cx="0" cy="-2" rx="9" ry="10" fill={fill} stroke={gold} strokeWidth="1.5" />
          <ellipse cx="-3" cy="-5" rx="2.2" ry="2.8" fill={gold} stroke="none" />
          <ellipse cx="3"  cy="-5" rx="2.2" ry="2.8" fill={gold} stroke="none" />
          <path d="M -4 2 L -2 7 M 0 2 L 0 7 M 4 2 L 2 7" stroke={gold} strokeWidth="1" />
          <path d="M -26 -2 L -26 20 L -14 20 L -14 8 L -4 20 L 4 20 L 14 8 L 14 20 L 26 20 L 26 -2" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <rect x="-3" y="16" width="6" height="46" fill={stroke} />
          <line x1="0" y1="16" x2="0" y2="62" stroke={gold} strokeWidth="1.5" />
          <path d="M -16 22 L 16 22 L 14 28 L -14 28 Z" fill={gold} stroke={stroke} strokeWidth="1.5" />
          <path d="M -5 14 L 0 6 L 5 14 Z" fill={gold} stroke={stroke} strokeWidth="1" />
          <path d="M -4 60 L 0 70 L 4 60 Z" fill={halo} stroke={stroke} strokeWidth="1" />
          <path d="M -24 56 C -22 40 -12 36 -10 50 C -8 36 0 30 0 48 C 0 30 8 36 10 50 C 12 36 22 40 24 56 Z" fill={gold} stroke="none" opacity="0.9" />
          <path d="M -14 56 C -12 44 -4 42 -2 52 C 2 42 12 44 10 56 Z" fill={halo} stroke={halo} strokeWidth="1" opacity="0.8" />
          <path d="M -28 56 L 28 56 L 22 68 L 8 68 L 8 76 L 18 76 L 18 82 L -18 82 L -18 76 L -8 76 L -8 68 L -22 68 Z" />
          <rect x="-26" y="56" width="52" height="5" fill={gold} stroke="none" />
          <circle cx="-14" cy="64" r="3" fill={halo} stroke={stroke} strokeWidth="1" />
          <circle cx="0"   cy="64" r="3" fill={gold} stroke={stroke} strokeWidth="1" />
          <circle cx="14"  cy="64" r="3" fill={halo} stroke={stroke} strokeWidth="1" />
          <rect x="-18" y="76" width="36" height="4" fill={gold} stroke="none" />
        </g>
      )

    default:
      return <circle r="30" fill={fill} stroke={stroke} strokeWidth={sw} />
  }
}

interface StainedGlassProps extends GlassColors {
  icon: string
}

export default function StainedGlass({ icon, halo, gold, stroke }: StainedGlassProps) {
  const id = useId()
  return (
    <svg viewBox="0 0 600 800" className="glass-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <clipPath id={`arch-${id}`}>
          <path d="M 40 800 L 40 260 A 260 260 0 0 1 560 260 L 560 800 Z" />
        </clipPath>
        <linearGradient id={`glow-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0"    stopColor={halo}   stopOpacity="1" />
          <stop offset="0.55" stopColor={gold}   stopOpacity="0.95" />
          <stop offset="1"    stopColor="#000"   stopOpacity="1" />
        </linearGradient>
      </defs>

      <rect width="600" height="800" fill="#101014" />
      <g clipPath={`url(#arch-${id})`}>
        <rect width="600" height="800" fill={`url(#glow-${id})`} />
        <g transform="translate(300 340)" opacity="0.45">
          {Array.from({ length: 16 }, (_, i) => {
            const ang = (i / 16) * 360
            return (
              <rect key={i} x="-2" y="-260" width="4" height="260"
                fill={stroke} opacity="0.35" transform={`rotate(${ang})`} />
            )
          })}
          <circle r="130" fill="none" stroke={stroke} strokeOpacity="0.4" strokeWidth="1" />
          <circle r="70"  fill="none" stroke={stroke} strokeOpacity="0.4" strokeWidth="1" />
        </g>
        <g transform="translate(300 380)">
          <GlassIcon name={icon} halo={halo} gold={gold} stroke={stroke} />
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
