import vine from '@vinejs/vine'
import { uniqueRule } from '../rules/unique.js'

export const registerValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .trim()
      .use(uniqueRule({ table: 'users', column: 'username', caseInsensitive: true }))
      .minLength(2)
      .maxLength(30),
    surname: vine.string().trim().minLength(2).maxLength(20),
    name: vine.string().trim().minLength(2).maxLength(20),
    patronymic: vine.string().trim().minLength(2).maxLength(20),
    position: vine.string().trim().minLength(2).maxLength(30).escape(),
    email: vine
      .string()
      .trim()
      .email()
      .use(uniqueRule({ table: 'users', column: 'email', caseInsensitive: true })),
    password: vine.string().minLength(6),
  })
)
