import type { createVoltageClassValidator, updateVoltageClassValidator } from '#voltage_class/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateVoltageClass = Infer<typeof createVoltageClassValidator> & { userId: number }

export type UpdateVoltageClass = Infer<typeof updateVoltageClassValidator>
