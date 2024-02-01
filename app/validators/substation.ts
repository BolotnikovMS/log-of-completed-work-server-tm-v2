import vine from '@vinejs/vine'

export const substationValidator = vine.compile(
  vine.object({
    active: vine.boolean().optional(),
    districtId: vine.number(),
    voltageClassesId: vine.number(),
    typeKpId: vine.number(),
    headControllerId: vine.number(),
    mainChannelId: vine.number(),
    backupChannelId: vine.number().optional(),
    additionalChannelId: vine.number().optional(),
    gsmId: vine.number().optional(),
    name: vine.string().trim().minLength(2).maxLength(150).escape(),
    rdu: vine.boolean().optional(),
    mainChannelIp: vine.string().ipAddress(4).optional(),
    backupChannelIp: vine.string().ipAddress(4).optional(),
  })
)
