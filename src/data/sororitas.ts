import type { Order } from './types'
import sororitasIndex from '../assets/sororitas/index.json'

type RawOrder = {
  id: string
  category: string
  title: string
  name: string
  matriarch: string
  epithet: string
  convent: string
  founded: string
  parish: string
  dogma: string
  colors: string
  icon: string
  glass: [string, string, string]
  lore: string[]
}

const modules = import.meta.glob<RawOrder>(
  '../assets/sororitas/order-*.json',
  { eager: true, import: 'default' },
)

const byId = new Map<string, RawOrder>()
for (const mod of Object.values(modules)) byId.set(mod.id, mod)

const sororitas: Order[] = sororitasIndex.order
  .map(id => byId.get(id))
  .filter((m): m is RawOrder => Boolean(m) && m!.category === 'order-militant')
  .map(m => ({
    id:        m.id.replace(/^order-/, ''),
    name:      m.name,
    epithet:   m.epithet,
    matriarch: m.matriarch,
    convent:   m.convent,
    founded:   m.founded,
    parish:    m.parish,
    dogma:     m.dogma,
    colors:    m.colors,
    icon:      m.icon,
    glass:     m.glass,
    lore:      m.lore,
  }))

export default sororitas
