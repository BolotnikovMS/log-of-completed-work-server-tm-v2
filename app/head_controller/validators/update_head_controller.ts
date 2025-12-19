import { text150, text30 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const updateHeadControllerValidator = vine.compile(
  vine.object({
    name: text30.escape().optional(),
    actualFirmwareVersion: text150.escape().optional().nullable()
  })
)
