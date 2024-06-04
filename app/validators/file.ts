import vine from '@vinejs/vine'

export const fileValidator = vine.compile(
  vine.object({
    substationId: vine.number(),
    file: vine.array(vine.file()).notEmpty(),
    typeFile: vine.string().in(['photo_ps', 'backup', 'other_files']),
  })
)
