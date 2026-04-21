import type { Primarch } from '@/data/types'

export const W = 1200, H = 700
export const cx = 640, cy = 350
export const r1 = 160, r2 = 300

export interface Node {
  p: Primarch
  x: number
  y: number
  ring: number
  angle: number
  labelDY?: number
}

export function generateStars(): { x: number; y: number; r: number; o: number }[] {
  const arr: { x: number; y: number; r: number; o: number }[] = []
  let seed = 42
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
  for (let i = 0; i < 120; i++) {
    arr.push({ x: rand() * W, y: rand() * H, r: rand() * 0.8 + 0.2, o: rand() * 0.5 + 0.2 })
  }
  return arr
}

export function interleaveByAllegiance(primarchs: Primarch[]): Primarch[] {
  const loyal   = primarchs.filter(p => p.allegiance === 'Loyalist')
  const traitor = primarchs.filter(p => p.allegiance === 'Traitor')
  const out: Primarch[] = []
  const n = Math.max(loyal.length, traitor.length)
  for (let i = 0; i < n; i++) {
    if (loyal[i])   out.push(loyal[i])
    if (traitor[i]) out.push(traitor[i])
  }
  return out
}

export function computePositions(ordered: Primarch[]): Node[] {
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
}
