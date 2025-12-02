import vine from '@vinejs/vine'

export const fileSubstationKeyValidator = vine.compile(
  vine.object({
    csvFile: vine.file({
      size: '10mb',
      extnames: ['csv']
    })
  })
)
