export interface Primarch {
  id: string
  num: string
  roman: string
  name: string
  epithet: string
  legionId: string | null
  legion: string
  roleLabel?: string
  homeworld: string
  allegiance: 'Loyalist' | 'Traitor'
  status: string
  portrait: string
  isEmperor?: boolean
  hue: number
  lore: string[]
}

export interface Legion {
  id: string
  num: string
  name: string
  motto: string
  primarchId: string
  primarch: string
  homeworld: string
  allegiance: 'Loyalist' | 'Traitor'
  founding: string
  colors: string
  strength: string
  lore: string[]
}

export interface Forge {
  id: string
  name: string
  epithet: string
  segmentum: string
  titanLegion: string
  fabricator: string
  dogma: string
  colors: string
  primacy: string
  iconSeed: string
  lore: string[]
}

export interface Order {
  id: string
  name: string
  epithet: string
  matriarch: string
  convent: string
  founded: string
  parish: string
  dogma: string
  colors: string
  icon: string
  glass: [string, string, string]
  lore: string[]
}

export interface AstropathData {
  primarchs: Primarch[]
  legions: Legion[]
  mechanicus: Forge[]
  sororitas: Order[]
}

export type View = 'galaxy' | 'mechanicus' | 'sororitas' | 'primarch' | 'legion' | 'lore' | 'forge' | 'order'

export interface Nav {
  view: View
  id: string | null
}

export type Theme = 'void' | 'archive' | 'cathedral' | 'codex'
