import type { createGsmOperatorValidator, updateGsmOperatorValidator } from '#gsm_operator/validators/index'
import type { Infer } from '@vinejs/vine/types'

export type CreateGsmOperator = Infer<typeof createGsmOperatorValidator> & { userId: number }

export type UpdateGsmOperator = Infer<typeof updateGsmOperatorValidator>
