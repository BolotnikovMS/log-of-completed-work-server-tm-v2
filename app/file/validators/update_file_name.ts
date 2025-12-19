import { text50 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const fileUpdateNameValidator = vine.compile(
  vine.object({
    clientName: text50
  })
)
