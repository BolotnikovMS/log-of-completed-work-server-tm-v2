import { OrderByEnums } from '#shared/enums/sort'
import vine from '@vinejs/vine'

export const baseQueryParamsSchema = {
  page: vine.number().positive().withoutDecimals().min(1).optional(),
  limit: vine.number().positive().withoutDecimals().min(1).optional(),
  sort: vine.string().optional(),
  order: vine.enum(OrderByEnums).optional(),
  search: vine.string().optional(),
}

export const baseQueryParamsValidator = vine.compile(vine.object(baseQueryParamsSchema))
