import type { createTypeWorkValidator, updateTypeWorkValidator } from '#type_work/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateTypeWork = Infer<typeof createTypeWorkValidator> & { userId: number }

export type UpdateTypeWort = Infer<typeof updateTypeWorkValidator>
