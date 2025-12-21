import { createVoltageClassValidator } from '#voltage_class/validators/create_voltage_class'
import { test } from '@japa/runner'

test.group('✅ Позитивные тесты. Проверка схемы создания "Voltage class".', () => {
  test('Тестирование "Класс эквивалентности" - 10/35/110.', async ({ assert }) => {
    const testData = { name: '10/35/110' }
    const output = await createVoltageClassValidator.validate(testData)

    assert.containsSubset(output, { name: '10&amp;amp;amp;amp;amp;#x2F;35&amp;amp;amp;amp;amp;#x2F;110' })
  })

  test('{$i} - Тестирование "Границ схемы" - {name}.')
    .with([
      { name: '10' },
      { name: '110' },
      { name: '1'.repeat(30) },
      { name: '1'.repeat(29) }
    ])
    .run(async ({ assert }, row) => {
      const output = await createVoltageClassValidator.validate(row)

      assert.containsSubset(output, row)
    })
})
