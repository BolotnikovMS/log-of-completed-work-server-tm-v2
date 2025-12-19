import { LogActionType } from '#log/enums/index'
import { baseQueryParamsSchema } from '#shared/validators/query_param'
import vine from '@vinejs/vine'

const logQueryParamsSchema = {
  ...baseQueryParamsSchema,
  action: vine.enum(LogActionType).optional()
}

export const queryParamsLogValidator = vine.compile(vine.object(logQueryParamsSchema))
