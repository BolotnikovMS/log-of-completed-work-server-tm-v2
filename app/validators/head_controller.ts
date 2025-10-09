import vine from '@vinejs/vine'
import { text150, text30 } from './fields_check.js'

export const headControllerValidator = vine.compile(
  vine.object({
    name: text30.escape(),
    actualFirmwareVersion: text150.escape().optional().nullable()
  })
)
