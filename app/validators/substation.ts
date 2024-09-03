import vine from '@vinejs/vine'
import {
  booleanCheckOptional,
  ipOptional,
  numberCheck,
  text240,
} from './fields_check.js'

export const substationValidator = vine.compile(
  vine.object({
    active: booleanCheckOptional,
    districtId: numberCheck,
    voltageClassesId: numberCheck,
    typeKpId: numberCheck,
    headControllerId: numberCheck,
    mainChannelId: numberCheck,
    backupChannelId: numberCheck,
    additionalChannelId: numberCheck,
    gsmId: numberCheck,
    name: text240,
    rdu: booleanCheckOptional,
    mainChannelIp: ipOptional,
    backupChannelIp: ipOptional,
  })
)
