import { updateSubstationValidator } from '#substation/validators/update_substation'
import { test } from '@japa/runner'
import { positiveUpdateTestData, positiveUpdateTestDataXSS } from './test_data.js'

test.group('✅ Позитивные тесты. Проверка схемы обновления "Substation".', () => {
  test('{$i} - Тестирование частичного обновления - {descrTest}.')
    .with(positiveUpdateTestData)
    .run(async ({ assert }, testItem) => {
      const output = await updateSubstationValidator.validate(testItem)

      assert.isObject(output)
      assert.include(testItem, output)
    })
  test('Тестирование частичного обновления - Значение с пробелами.', async ({ assert }) => {
    const testData = {
      name: '    Test     ',
      descrTest: 'Значение с пробелами'
    }
    const output = await updateSubstationValidator.validate(testData)

    assert.isObject(output)
    assert.equal(testData.name.trim(), output.name)
    assert.isString(output.name)
  })
  test('Тестирование XSS.', async ({ assert }) => {
    const output = await updateSubstationValidator.validate(positiveUpdateTestDataXSS)

    assert.isObject(output)
    assert.equal(output.name, '&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;script&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;alert(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;1&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;)&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;#x2F;script&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;')
    assert.isString(output.name)
  })
})
