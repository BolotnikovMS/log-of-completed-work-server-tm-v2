import { noStrictNumberCheck, typeFile } from '#shared/validators/fields_check'
import { baseQueryParamsSchema } from '#shared/validators/query_param'
import vine from '@vinejs/vine'

const queryParamsFileSchema = {
  ...baseQueryParamsSchema,
  substationId: noStrictNumberCheck.optional(),
  typeFile: typeFile.optional()
}

export const queryParamsFileValidation = vine.compile(vine.object(queryParamsFileSchema))
