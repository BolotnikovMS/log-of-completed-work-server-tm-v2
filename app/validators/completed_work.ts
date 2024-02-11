import vine from '@vinejs/vine'

export const completedWorkValidator = vine.compile(
  vine.object({
    substationId: vine.number(),
    description: vine.string().trim().minLength(2).maxLength(1000).escape(),
    note: vine.string().trim().minLength(3).maxLength(700).optional(),
    dateCompletion: vine.date(),
  })
)
