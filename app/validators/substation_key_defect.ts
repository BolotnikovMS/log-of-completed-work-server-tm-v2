import vine from '@vinejs/vine'
import { uniqueRule } from '../rules/unique.js'

export const substationKeyDefectValidator = vine.compile(
  vine.object({
    keyDefectSubstation: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .use(uniqueRule({ table: 'substations', column: 'key_defect_substation' }))
      .optional()
      .nullable()
  })
)
