import { text50 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const createChannelTypeValidator = vine.compile(
  vine.object({
    name: text50.escape()
  })
)
