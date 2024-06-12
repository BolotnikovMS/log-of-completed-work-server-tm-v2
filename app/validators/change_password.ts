import vine from '@vinejs/vine'

export const changePasswordValidator = vine.compile(
  vine.object({
    password: vine.string().minLength(6).confirmed({
      confirmationField: 'passwordConfirm',
    }),
  })
)
