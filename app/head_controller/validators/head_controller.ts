import { text150, text30 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const headControllerValidator = vine.compile(
  vine.object({
    name: text30.escape(),
    actualFirmwareVersion: text150.escape().optional().nullable()
  })
)
