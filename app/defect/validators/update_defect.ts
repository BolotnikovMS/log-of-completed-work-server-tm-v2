import { DefectCategory } from '#defect/types/defect_category'
import { text1000 } from '#shared/validators/fields_check'
import vine from '@vinejs/vine'

export const updateDefect = vine.compile(
  vine.object({
    substationId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'substations', column: 'id' })
      .optional(),
    description: text1000.optional(),
    category: vine.enum(DefectCategory).optional(),
  })
)
