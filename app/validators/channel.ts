import vine from '@vinejs/vine'
import { ipOptional, numberCheck, text700Optional } from '#validators/fields_check'

export const channelValidator = vine.compile(
  vine.object({
    substationId: numberCheck,
    channelCategoryId: numberCheck,
    channelTypeId: numberCheck,
    ipAddress: ipOptional,
    note: text700Optional,
  })
)
