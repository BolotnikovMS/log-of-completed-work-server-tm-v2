import vine from '@vinejs/vine'
import { arrFiles, text50, typeFile } from './fields_check.js'

export const fileValidator = vine.compile(
  vine.object({
    substationId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'substations', column: 'id' }),
    file: arrFiles,
    typeFile: typeFile,
  })
)

export const fileSubstationKeyValidator = vine.compile(
  vine.object({
    csvFile: vine.file({
      size: '10mb',
      extnames: ['csv']
    })
  })
)

export const fileUpdateNameValidator = vine.compile(
  vine.object({
    clientName: text50
  })
)
