import vine from '@vinejs/vine'
import { uniqueRule } from '../rules/unique.js'

export const text240 = vine.string().trim().minLength(2).maxLength(240).escape()
export const text1000 = vine.string().trim().minLength(2).maxLength(1000).escape()
export const text700Optional = vine
  .string()
  .trim()
  .minLength(3)
  .maxLength(700)
  .optional()
  .nullable()
export const text180 = vine.string().trim().minLength(2).maxLength(180).escape()
export const text20 = vine.string().trim().minLength(2).maxLength(20)
export const text140 = vine.string().trim().minLength(2).maxLength(140)
export const text30 = vine.string().trim().minLength(2).maxLength(30).escape()
export const dateText = vine.string()
export const numberCheck = vine.number()
export const numberOptional = vine.number().optional().nullable()
export const arrFiles = vine.array(vine.file()).notEmpty()
export const typeFile = vine.string().in(['photo_ps', 'backup', 'other_files'])
export const username = vine
  .string()
  .trim()
  .use(uniqueRule({ table: 'users', column: 'username', caseInsensitive: true }))
  .minLength(2)
  .maxLength(30)
export const email = vine
  .string()
  .trim()
  .email()
  .use(uniqueRule({ table: 'users', column: 'email', caseInsensitive: true }))
export const booleanCheckOptional = vine.boolean().optional()
export const ipOptional = vine.string().ipAddress(4).optional().nullable()