import vine from '@vinejs/vine'
import {
  booleanCheckOptional,
  ipOptional,
  numberCheck,
  numberOptional,
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
    backupChannelId: numberOptional,
    additionalChannelId: numberOptional,
    gsmId: numberOptional,
    name: text240,
    rdu: booleanCheckOptional,
    mainChannelIp: ipOptional,
    backupChannelIp: ipOptional,
  })
)
