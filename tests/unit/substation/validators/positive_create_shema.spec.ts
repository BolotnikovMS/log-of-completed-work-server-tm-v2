import District from '#district/models/district'
import ObjectType from '#object_type/models/object_type'
import { createSubstationValidator } from '#substation/validators/create_substation'
import VoltageClass from '#voltage_class/models/voltage_class'
import { test } from '@japa/runner'
import { positiveTestData, positiveTestDataXSS } from './test_data.js'

test.group('✅ Позитивные тесты. Проверка схемы создания "Substation".', async () => {
  const district = await District.query().orderBy('id', 'desc').first()
  const voltageClasses = await VoltageClass.query().orderBy('id', 'desc').first()
  const objectType = await ObjectType.query().orderBy('id', 'desc').first()

  if (!district || !voltageClasses || !objectType) {
    return
  }

  test('{$i} - Тестирование "Класс эквивалентности и Границ" - {descrTest}.')
    .with(positiveTestData)
    .run(async ({ assert }, row) => {
      const output = await createSubstationValidator.validate(row)

      assert.equal(output.active, row.active)
      assert.isBoolean(output.active)
      assert.equal(output.districtId, row.districtId)
      assert.isNumber(output.districtId)
      assert.equal(output.voltageClassesId, row.voltageClassesId)
      assert.isNumber(output.voltageClassesId)
      assert.equal(output.objectTypeId, row.objectTypeId)
      assert.isNumber(output.objectTypeId)
      assert.equal(output.name, row.name.trim())
      assert.isString(output.name)
      assert.equal(output.rdu, row.rdu)
      assert.isBoolean(output.rdu)
    })

  test('Тестирование XSS.', async ({ assert }) => {
    const output = await createSubstationValidator.validate(positiveTestDataXSS)

    assert.equal(output.name, '&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;script&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;alert(&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;1&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;quot;)&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;lt;&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;#x2F;script&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;gt;')
    assert.isString(output.name)
  })
})
