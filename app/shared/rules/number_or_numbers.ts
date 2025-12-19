import vine from '@vinejs/vine'
import type { FieldContext } from '@vinejs/vine/types'

/**
 * Описание.
 *
 * Кастомное правило для проверки поля: позитивное целое число/массив чисел.
 *
 */

type Options = Record<string, never>

async function numberOrNumbers(value: unknown, _options: Options, field: FieldContext) {
  if (value === undefined || value === null) {
    return
  }

  let stringValues: string[] = []

  if (typeof value === 'string') {
    if (value.trim() === '') {
      field.report('Поле {{ field }} не может быть пустым!', 'numberOrNumbers.empty_string', field)

      return
    }

    stringValues = value.split(',').map((s) => s.trim()).filter(Boolean)
  } else if (Array.isArray(value)) {
    if (value.length === 0) {
      field.report('Поле {{ field }} не должно быть пустым массивом!', 'numberOrNumbers.empty_array', field)

      return
    }

    stringValues = value.map((item) => String(item).trim()).filter(Boolean)
  } else {
    field.report('Поле {{ field }} должно быть числом или массивом чисел!', 'numberOrNumbers.invalid_value', field)

    return
  }

  for (const str of stringValues) {
    const num = Number(str)

    if (isNaN(num) || !Number.isInteger(num) || num <= 0) {
      field.report('Каждый элемент в {{ field }} должен быть положительным целым числом!', 'numberOrNumbers.invalid_number', field)

      return
    }
  }

  return
}

export const numberOrNumbersRule = vine.createRule(numberOrNumbers)
