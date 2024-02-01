import vine from '@vinejs/vine'

export const headControllerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(200),
  })
)
