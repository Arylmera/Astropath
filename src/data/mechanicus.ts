import type { Forge } from './types'
import admechIndex from '../assets/admech/index.json'

const modules = import.meta.glob<Record<string, unknown>>(
  '../assets/admech/*.json',
  { eager: true, import: 'default' },
)

const byId = new Map<string, Record<string, unknown>>()
for (const [path, mod] of Object.entries(modules)) {
  if (path.endsWith('/index.json')) continue
  const id = mod['id'] as string
  byId.set(id, mod)
}

const mechanicus: Forge[] = admechIndex.order
  .map(id => byId.get(id))
  .filter((m): m is Record<string, unknown> => m?.['category'] === 'Forge World')
  .map(m => ({
    id:          m['id']          as string,
    name:        m['title']       as string,
    epithet:     m['epithet']     as string,
    segmentum:   m['segmentum']   as string,
    titanLegion: m['titanLegion'] as string,
    fabricator:  m['fabricator']  as string,
    dogma:       m['dogma']       as string,
    colors:      m['colors']      as string,
    primacy:     m['primacy']     as string,
    iconSeed:    m['iconSeed']    as string,
    lore:        m['lore']        as string[],
  }))

export default mechanicus
