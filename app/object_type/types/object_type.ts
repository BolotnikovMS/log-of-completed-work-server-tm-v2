import type { createObjectTypeValidator, updateObjectTypeValidator } from '#object_type/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateTypeObject = Infer<typeof createObjectTypeValidator> & { userId: number }

export type UpdateTypeObject = Infer<typeof updateObjectTypeValidator>
