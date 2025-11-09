import { ipOptional, text1000 } from '#validators/fields_check'
import vine from '@vinejs/vine'

export const channelValidator = vine.compile(
  vine.object({
    substationId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'substations', column: 'id' }),
    channelCategoryId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'channel_categories', column: 'id' }),
    channelTypeId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'channel_types', column: 'id' }),
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
