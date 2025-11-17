import { text50 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const updateChannelingEquipmant = vine.compile(
  vine.object({
    channelTypeId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'channel_types', column: 'id' })
      .optional(),
    name: text50.escape().optional(),
  })
)
