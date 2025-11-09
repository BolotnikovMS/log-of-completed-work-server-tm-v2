import { text50 } from '#validators/fields_check'
import vine from '@vinejs/vine'

export const channelingEquipmant = vine.compile(
  vine.object({
    channelTypeId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'channel_types', column: 'id' }),
    name: text50.escape(),
  })
)
