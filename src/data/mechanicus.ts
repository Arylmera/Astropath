import type { Forge } from './types'
import type { MechEntry, MechCategory } from './types/MechEntry'
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
    ...(m['image'] ? { image: m['image'] as string } : {}),
  }))

const CATEGORY_ORDER: MechCategory[] = ['Organisation', 'Theology', 'Rank', 'Character', 'Military', 'Technology', 'History']

const mechCategories = Object.fromEntries(
  CATEGORY_ORDER.map(cat => [cat, []])
) as unknown as Record<MechCategory, MechEntry[]>

for (const id of admechIndex.order) {
  const m = byId.get(id)
  if (!m) continue
  const cat = m['category'] as string
  if (cat === 'Forge World' || !(cat in mechCategories)) continue
  mechCategories[cat as MechCategory].push({
    id:          m['id']          as string,
    category:    cat,
    title:       m['title']       as string,
    epithet:     m['epithet']     as string,
    lore:        m['lore']        as string[],
    ...(m['founded']    ? { founded:    m['founded']    as string } : {}),
    ...(m['dogma']      ? { dogma:      m['dogma']      as string } : {}),
    ...(m['colors']     ? { colors:     m['colors']     as string } : {}),
    ...(m['specialty']  ? { specialty:  m['specialty']  as string } : {}),
    ...(m['aspect']     ? { aspect:     m['aspect']     as string } : {}),
    ...(m['worship']    ? { worship:    m['worship']    as string } : {}),
    ...(m['tier']       ? { tier:       m['tier']       as string } : {}),
    ...(m['homeworld']  ? { homeworld:  m['homeworld']  as string } : {}),
    ...(m['allegiance'] ? { allegiance: m['allegiance'] as string } : {}),
    ...(m['strength']   ? { strength:   m['strength']   as string } : {}),
    ...(m['status']     ? { status:     m['status']     as string } : {}),
    ...(m['period']     ? { period:     m['period']     as string } : {}),
    ...(m['image']      ? { image:      m['image']      as string } : {}),
  })
}

export { mechCategories }
export default mechanicus
