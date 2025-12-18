import type { queryParamsChannelingEquipmentValidator } from '#channeling_equipment/validators/query_params_channeling_equipment'
import type { Infer } from '@vinejs/vine/types'

export type QueryParamsChannelEquip = Infer<typeof queryParamsChannelingEquipmentValidator>
