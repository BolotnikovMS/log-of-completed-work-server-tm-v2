import { booleanCheck } from '#validators/fields_check'
import vine from '@vinejs/vine'

export const blockUserAccountValidator = vine.compile(
  vine.object({
    active: booleanCheck
  })
)
