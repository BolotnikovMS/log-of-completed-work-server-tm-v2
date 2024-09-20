import vine from '@vinejs/vine'
import { numberCheck } from './fields_check.js'

export const changeUserRole = vine.compile(
  vine.object({
    roleId: numberCheck
  })
)