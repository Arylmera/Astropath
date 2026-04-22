export type MechCategory = 'Organisation' | 'Theology' | 'Rank' | 'Character' | 'Military' | 'Technology' | 'History'

export interface MechEntry {
  id: string
  category: string
  title: string
  epithet: string
  lore: string[]
  founded?: string
  dogma?: string
  colors?: string
  specialty?: string
  aspect?: string
  worship?: string
  tier?: string
  homeworld?: string
  allegiance?: string
  strength?: string
  status?: string
  period?: string
  image?: string
}
