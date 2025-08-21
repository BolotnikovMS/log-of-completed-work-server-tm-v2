import { ELogActionType } from '#domains/logs/enums/index'
import vine from '@vinejs/vine'
import { noStrictNumberCheck } from './fields_check.js'

export const logParamsValidator = vine.compile(
  vine.object({
    page: noStrictNumberCheck.optional(),
    limit: noStrictNumberCheck.max(200).optional(),
    action: vine.enum(ELogActionType).optional()
  })
)
