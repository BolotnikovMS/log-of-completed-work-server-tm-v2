import { baseQueryParamsSchema } from '#shared/validators/query_param'
import vine from '@vinejs/vine'

const channelingEquipmentQueryParamsSchema = {
  ...baseQueryParamsSchema,
  channelType: vine.number().positive().withoutDecimals().min(1).optional()
}

export const queryParamsChannelingEquipmentValidator = vine.compile(vine.object(channelingEquipmentQueryParamsSchema))
