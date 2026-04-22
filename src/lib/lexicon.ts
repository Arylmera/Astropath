import type { Allegiance } from '@/data/types'

export const allegianceClass = (a: Allegiance): 'loyal' | 'traitor' =>
  a === 'Loyalist' ? 'loyal' : 'traitor'

export const formatFileId = (id: string): string =>
  id.toUpperCase().replace(/-/g, '‑')
