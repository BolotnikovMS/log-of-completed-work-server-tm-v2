import { booleanCheck, text50 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const updateSubstationValidator = vine.compile(
  vine.object({
    active: booleanCheck.optional(),
    districtId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'districts', column: 'id' })
      .optional(),
    voltageClassesId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'voltage_classes', column: 'id' })
      .optional(),
    objectTypeId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'object_types', column: 'id' })
      .optional(),
    name: text50.escape().optional(),
    rdu: booleanCheck.optional(),
  })
)
