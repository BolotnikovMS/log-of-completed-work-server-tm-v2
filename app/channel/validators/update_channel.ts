import { ipOptional, text1000 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const updateChannelValidator = vine.compile(
  vine.object({
    substationId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'substations', column: 'id' })
      .optional(),
    channelCategoryId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'channel_categories', column: 'id' })
      .optional(),
    channelTypeId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'channel_types', column: 'id' })
      .optional(),
    channelEquipmentId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'channeling_equipments', column: 'id' })
      .optional()
      .nullable(),
    gsmId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'gsm_operators', column: 'id' })
      .optional()
      .nullable(),
    ipAddress: ipOptional,
    note: text1000.optional().nullable(),
  })
)
