import { ipOptional, numberCheck, numberOptional, text700Optional } from '#validators/fields_check'
import vine from '@vinejs/vine'

export const channelValidator = vine.compile(
  vine.object({
    substationId: numberCheck,
    channelCategoryId: numberCheck,
    channelTypeId: numberCheck,
    channelEquipmentId: numberOptional,
    gsmId: numberOptional,
    ipAddress: ipOptional,
    note: text700Optional,
  })
)
