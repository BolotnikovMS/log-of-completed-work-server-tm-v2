import vine from '@vinejs/vine'

export const changePasswordValidator = vine.compile(
  vine.object({
    password: vine
      .string()
      .trim()
      .minLength(6)
      .maxLength(15)
      .confirmed({
        confirmationField: 'passwordConfirm',
      }),
  })
)
