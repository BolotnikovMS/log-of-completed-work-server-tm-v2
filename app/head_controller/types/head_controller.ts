import type { createHeadControllerValidator, updateHeadControllerValidator } from '#head_controller/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateHeadController = Infer<typeof createHeadControllerValidator> & { userId: number }

export type UpdateHeadController = Infer<typeof updateHeadControllerValidator>
