import type { Allegiance } from './Allegiance'

export interface Legion {
  id: string
  num: string
  name: string
  motto: string
  primarchId: string
  primarch: string
  homeworld: string
  allegiance: Allegiance
  founding: string
  colors: string
  strength: string
  source?: string
  image?: string
  lore: string[]
}
