import type { createCompletedWorkValidator, updateCompletedWorkValidator } from '#completed_work/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateCompletedWork = Infer<typeof createCompletedWorkValidator> & { userId: number }

export type UpdateCompletedWork = Infer<typeof updateCompletedWorkValidator>
