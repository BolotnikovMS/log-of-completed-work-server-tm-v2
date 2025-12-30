import { updateSubstationValidator } from '#substation/validators/update_substation'
import { test } from '@japa/runner'
import { incorrectUpdateTestData } from './test_data.js'

test.group('⛔️ Негативные тесты. Тесты для проверки функционала "Substation', () => {
  test('{$i} - Проверка: {descrTest}.')
    .with(incorrectUpdateTestData)
    .run(async ({ assert }, testItem) => {
      const output = await updateSubstationValidator.tryValidate(testItem)
      const data = output[0]?.messages

      assert.containsSubset(data, [{ message: testItem.errMessage }])
    })
})
