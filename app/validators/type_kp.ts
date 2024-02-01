import vine from '@vinejs/vine'

export const typeKpValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(250),
  })
)
