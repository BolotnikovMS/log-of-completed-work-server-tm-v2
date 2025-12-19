import { numberCheck } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const changeUserRole = vine.compile(
  vine.object({
    roleId: numberCheck
  })
)
