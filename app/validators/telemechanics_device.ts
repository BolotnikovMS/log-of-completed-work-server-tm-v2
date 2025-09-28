import vine from '@vinejs/vine'
import { text1000 } from './fields_check.js'

export const telemechanicsDeviceValidator = vine.compile(
  vine.object({
    substationId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'substations', column: 'id' }),
    typeKpId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'type_kps', column: 'id' }),
    headControllerId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals().min(1)
      .exists({ table: 'head_controllers', column: 'id' }),
    note: text1000.optional().nullable(),
  })
)
