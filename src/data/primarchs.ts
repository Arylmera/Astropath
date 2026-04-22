import type { Allegiance } from './types/Allegiance'
import type { Primarch } from './types'
import primarchsIndex from '../assets/primarchs/index.json'

type RawPrimarch = {
  id: string
  num: string
  roman: string
  legionNumber: string
  legionId: string | null
  legion: string
  title: string
  name: string
  epithet: string
  roleLabel?: string
  homeworld: string
  allegiance: Allegiance
  status: string
  isEmperor?: boolean
  hue: number
  lore: string[]
}

const dataModules = import.meta.glob<RawPrimarch>(
  '../assets/primarchs/*/data.json',
  { eager: true, import: 'default' },
)

const portraitModules = import.meta.glob<string>(
  '../assets/primarchs/*/portrait.{jpg,jpeg,png,webp,svg,gif}',
  { eager: true, query: '?url', import: 'default' },
)

const portraitById = new Map<string, string>()
for (const [path, url] of Object.entries(portraitModules)) {
  const m = path.match(/\/primarchs\/([^/]+)\/portrait\./)
  if (m) portraitById.set(m[1], url)
}

const byId = new Map<string, RawPrimarch>()
for (const mod of Object.values(dataModules)) byId.set(mod.id, mod)

const primarchs: Primarch[] = primarchsIndex.order
  .map(id => byId.get(id))
  .filter((m): m is RawPrimarch => Boolean(m))
  .map(m => ({
    id:         m.id,
    num:        m.num,
    roman:      m.roman,
    name:       m.name,
    epithet:    m.epithet,
    legionId:   m.legionId,
    legion:     m.legion,
    ...(m.roleLabel ? { roleLabel: m.roleLabel } : {}),
    homeworld:  m.homeworld,
    allegiance: m.allegiance,
    status:     m.status,
    portrait:   portraitById.get(m.id) ?? '',
    ...(m.isEmperor ? { isEmperor: true } : {}),
    hue:        m.hue,
    lore:       m.lore,
  }))

export default primarchs
