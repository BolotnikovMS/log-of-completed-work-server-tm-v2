import type { createTypeKpValidator, updateTypeKpValidator } from '#type_kp/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateTypeKp = Infer<typeof createTypeKpValidator> & { userId: number }

export type UpdateTypeKp = Infer<typeof updateTypeKpValidator>
