import vine from '@vinejs/vine'

export const districtValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(100),
    shortName: vine.string().trim().minLength(2).maxLength(100),
  })
)
