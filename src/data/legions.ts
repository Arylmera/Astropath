import type { Allegiance } from './types/Allegiance'
import type { Legion } from './types'
import spaceMarinesIndex from '../assets/space-marines/index.json'

type RawLegion = {
  id: string
  founding: string
  legionNumber: string | null
  primarchId?: string
  primarch: string | null
  allegiance: Allegiance
  title: string
  name?: string
  homeworld: string
  colors: string[]
  colorsString?: string
  battleCry?: string
  motto?: string
  strength?: string
  image?: string
  lore?: string[]
  source?: string
}

const modules = import.meta.glob<RawLegion>(
  '../assets/space-marines/*.json',
  { eager: true, import: 'default' },
)

const byId = new Map<string, RawLegion>()
for (const [path, mod] of Object.entries(modules)) {
  if (path.endsWith('/index.json')) continue
  byId.set(mod.id, mod)
}

const legions: Legion[] = spaceMarinesIndex.order
  .map(id => byId.get(id))
  .filter((m): m is RawLegion => Boolean(m) && Boolean(m!.primarchId) && Boolean(m!.lore))
  .map(m => ({
    id:         m.id,
    num:        m.legionNumber ?? '—',
    name:       m.name ?? m.title,
    motto:      m.motto ?? m.battleCry ?? '',
    primarchId: m.primarchId!,
    primarch:   m.primarch ?? '',
    homeworld:  m.homeworld,
    allegiance: m.allegiance,
    founding:   m.founding,
    colors:     m.colorsString ?? m.colors.join(' & '),
    strength:   m.strength ?? '',
    ...(m.source ? { source: m.source } : {}),
    ...(m.image  ? { image:  m.image  } : {}),
    lore:       m.lore!,
  }))

export default legions
