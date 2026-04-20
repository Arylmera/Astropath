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
  source?: string
  image?: string
  lore: string[]
}
