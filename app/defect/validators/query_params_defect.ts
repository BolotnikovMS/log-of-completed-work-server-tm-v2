import { DefectCategory, DefectStatus } from '#defect/types/defect_category'
import { noStrictNumberCheck } from '#shared/validators/fields_check'
import { baseQueryParamsSchema } from '#shared/validators/query_param'
import vine from '@vinejs/vine'

const defectQueryParamsSchema = {
  ...baseQueryParamsSchema,
  substation: noStrictNumberCheck.optional(),
  status: vine.string().in([DefectStatus.open, DefectStatus.close]).optional(),
  category: vine.string().in([DefectCategory.defect, DefectCategory.remark, DefectCategory.other]).optional()
}

export const queryParamsDefectValidator = vine.compile(vine.object(defectQueryParamsSchema))
