import { text50 } from '#validators/fields_check'
import vine from '@vinejs/vine'

export const objectTypeValidator = vine.compile(
  vine.object({
    name: text50.escape(),
    shortName: text50.escape(),
  })
)
