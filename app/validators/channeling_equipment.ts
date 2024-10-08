import { numberCheck, text240 } from '#validators/fields_check'
import vine from '@vinejs/vine'

export const channelingEquipmant = vine.compile(
  vine.object({
    channelTypeId: numberCheck,
    name: text240,
  })
)
