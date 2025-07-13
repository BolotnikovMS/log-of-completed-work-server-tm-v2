import vine from '@vinejs/vine'
import { email, numberCheck, text20, text30, username } from './fields_check.js'

export const registerValidator = vine.compile(
  vine.object({
    username: username,
    surname: text20,
    name: text20,
    patronymic: text20,
    position: text30,
    email: email,
    password: vine
      .string()
      .trim()
      .minLength(6)
      .maxLength(15),
    roleId: numberCheck,
  })
)
