import type { createDistrictValidator, updateDistrictValidator } from '#district/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateDistrict = Infer<typeof createDistrictValidator> & { userId: number }

export type UpdateDistrict = Infer<typeof updateDistrictValidator>
