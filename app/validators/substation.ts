import vine from '@vinejs/vine'
import {
  booleanCheck,
  text50
} from './fields_check.js'

export const substationValidator = vine.compile(
  vine.object({
    active: booleanCheck.optional(),
    districtId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'districts', column: 'id' }),
    voltageClassesId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'voltage_classes', column: 'id' }),
    objectTypeId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'object_types', column: 'id' }),
    name: text50.escape(),
    rdu: booleanCheck.optional(),
  })
)
