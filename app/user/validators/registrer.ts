import { email, text20, text30, username } from '#validators/fields_check'
import vine from '@vinejs/vine'

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
    roleId: vine
      .number({ strict: true })
      .positive()
      .withoutDecimals()
      .min(1)
      .exists({ table: 'roles', column: 'id' }),
  })
)
