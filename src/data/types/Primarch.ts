import type { Allegiance } from './Allegiance'

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
  allegiance: Allegiance
  status: string
  portrait: string
  isEmperor?: boolean
  hue: number
  lore: string[]
}
