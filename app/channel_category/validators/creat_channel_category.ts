import { text50 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const createChannelCategoryValidator = vine.compile(
  vine.object({
    name: text50.escape(),
    shortName: text50.escape(),
  })
)
