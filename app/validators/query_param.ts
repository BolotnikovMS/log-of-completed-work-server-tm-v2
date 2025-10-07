import { OrderByEnums } from '#enums/sort'
import vine from '@vinejs/vine'

export const queryParamsValidator = vine.compile(
  vine.object({
    page: vine.number().positive().withoutDecimals().min(1).optional(),
    limit: vine.number().positive().withoutDecimals().min(1).optional(),
    sort: vine.string().optional(),
    order: vine.enum(OrderByEnums).optional(),
    search: vine.string().optional(),
  })
)
