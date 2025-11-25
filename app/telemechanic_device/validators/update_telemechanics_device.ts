import { text1000, text150 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const updateTelemechanicsDeviceValidator = vine.compile(
  vine.object({
    substationId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'substations', column: 'id' })
      .optional(),
    typeKpId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'type_kps', column: 'id' })
      .optional(),
    headControllerId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals().min(1)
      .exists({ table: 'head_controllers', column: 'id' })
      .optional(),
    controllerFirmwareVersion: text150.escape().optional().nullable(),
    note: text1000.optional().nullable(),
  })
)
