import { text50 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const typeWorkValidator = vine.compile(
  vine.object({
    name: text50.escape(),
  })
)
