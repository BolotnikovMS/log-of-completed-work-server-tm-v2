import type { createChannelingEquipmant, updateChannelingEquipmant } from '#channeling_equipment/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateChannelingEquipment = Infer<typeof createChannelingEquipmant> & { userId: number }

export type UpdateChannelingEquipment = Infer<typeof updateChannelingEquipmant>
