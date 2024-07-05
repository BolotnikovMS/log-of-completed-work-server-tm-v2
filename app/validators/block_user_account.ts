import vine from '@vinejs/vine'
import { booleanCheck } from './fields_check.js'

export const blockUserAccountValidator = vine.compile(
  vine.object({
    active: booleanCheck
  })
)
