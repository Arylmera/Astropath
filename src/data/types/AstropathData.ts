import type { Primarch } from './Primarch'
import type { Legion } from './Legion'
import type { Forge } from './Forge'
import type { Order } from './Order'

export interface AstropathData {
  primarchs: Primarch[]
  legions: Legion[]
  mechanicus: Forge[]
  sororitas: Order[]
}
