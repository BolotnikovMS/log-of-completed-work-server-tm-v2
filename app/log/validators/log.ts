import { ELogActionType } from '#domains/logs/enums/index'
import { noStrictNumberCheck } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const logParamsValidator = vine.compile(
  vine.object({
    page: noStrictNumberCheck.optional(),
    limit: noStrictNumberCheck.max(200).optional(),
    action: vine.enum(ELogActionType).optional()
  })
)
