import { text140 } from '#validators/fields_check'
import vine from '@vinejs/vine'

export const objectTypeValidator = vine.compile(
  vine.object({
    name: text140,
    shortName: text140,
  })
)
