import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    password: vine.string(),
  })
)
