import { uniqueRule } from '#shared/rules/unique'
import vine from '@vinejs/vine'

export const text20 = vine.string().trim().minLength(2).maxLength(20)
export const text30 = vine.string().trim().minLength(2).maxLength(30)
export const text50 = vine.string().trim().minLength(2).maxLength(50)
export const text150 = vine.string().trim().minLength(2).maxLength(150)
export const text1000 = vine.string().trim().minLength(2).maxLength(1000).escape()
export const dateText = vine.string()
// Не работает, если нужна проверка через бд
export const numberCheck = vine
  .number({ strict: true })
  .positive()
  .withoutDecimals()
  .min(1)
export const noStrictNumberCheck = vine
  .number()
  .positive()
  .withoutDecimals()
  .min(1)
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
export const booleanCheck = vine.boolean()
export const ipOptional = vine.string().ipAddress(4).optional().nullable()
