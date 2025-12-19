import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import type { FieldContext } from '@vinejs/vine/types'

type Options = {
  table: string
  column: string
  caseInsensitive?: boolean
}

/**
 * Description
 * @param {unknown} value. Значение для проверки на уникальность в таблице бд.
 * @param {Options} options. Набор параметров. Название таблицы в бд, имя столбца, чувствительность к регистру.
 * @param {FieldContext} field. Название поля.
 * @returns {any}
 */

async function unique(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return
  }

  const { table, column, caseInsensitive } = options
  const row = await db
    .from(table)
    .if(!!caseInsensitive === true, (query) => query.whereLike(column, value))
    .if(!!caseInsensitive === false, (query) => query.where(column, value))
    .first()

  if (row) {
    field.report('The {{ field }} field is not unique', 'unique', field)
  }
}

export const uniqueRule = vine.createRule(unique)
