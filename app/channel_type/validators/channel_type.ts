import { text50 } from '#validators/fields_check'
import vine from '@vinejs/vine'

export const chanelTypeValidator = vine.compile(
  vine.object({
    name: text50.escape(),
  })
)
