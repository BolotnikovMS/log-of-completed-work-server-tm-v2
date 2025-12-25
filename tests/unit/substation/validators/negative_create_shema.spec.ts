import { createSubstationValidator } from '#substation/validators/create_substation'
import { test } from '@japa/runner'
import { incorrectData } from './test_data.js'

test.group('⛔️ Негативные тесты. Тесты для проверки функционала "Substation".', async () => {
  test('{$i} - Проверка: {descrTest}.')
    .with(incorrectData)
    .run(async ({ assert }, testItem) => {
      const output = await createSubstationValidator.tryValidate(testItem)
      const data = output[0]?.messages

      assert.containsSubset(data, [{ message: testItem.errMessage }])
    })
})
