import vine from '@vinejs/vine'

// Схема проверки id в url адресе
// Возможность проверки наличия записи в бд
export const urlParamIdValidator = vine.compile(
  vine.object({
    id: vine.number().positive().withoutDecimals().min(1),
  })
)
