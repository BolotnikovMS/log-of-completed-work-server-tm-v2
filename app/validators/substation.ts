import vine from '@vinejs/vine'
import {
  booleanCheckOptional,
  numberCheck,
  text240
} from './fields_check.js'

export const substationValidator = vine.compile(
  vine.object({
    active: booleanCheckOptional,
    districtId: numberCheck,
    voltageClassesId: numberCheck,
    typeKpId: numberCheck,
    headControllerId: numberCheck,
    name: text240,
    rdu: booleanCheckOptional,
  })
)
