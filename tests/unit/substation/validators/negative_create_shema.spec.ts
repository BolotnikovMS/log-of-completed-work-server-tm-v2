import District from '#district/models/district'
import ObjectType from '#object_type/models/object_type'
import { createSubstationValidator } from '#substation/validators/create_substation'
import VoltageClass from '#voltage_class/models/voltage_class'
import { test } from '@japa/runner'

test.group('⛔️ Негативные тесты. Тесты для проверки функционала "Substation".', async () => {
  const district = await District.query().orderBy('id', 'desc').first()
  const voltageClasses = await VoltageClass.query().orderBy('id', 'desc').first()
  const objectType = await ObjectType.query().orderBy('id', 'desc').first()

  if (!district || !voltageClasses || !objectType) {
    return
  }
  const incorrectData = [
    // districtId
    { active: true, districtId: '1', voltageClassesId: voltageClasses.id, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Не число (строка)', errMessage: 'В поле districtId должно быть введено число.' },
    { active: true, districtId: true, voltageClassesId: voltageClasses.id, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Не число (булево)', errMessage: 'В поле districtId должно быть введено число.' },
    { active: true, districtId: null, voltageClassesId: voltageClasses.id, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Не число (null)', errMessage: 'Поле является обязательным.' },
    { active: true, districtId: {}, voltageClassesId: voltageClasses.id, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Не число (объект)', errMessage: 'В поле districtId должно быть введено число.' },
    { active: true, districtId: -4, voltageClassesId: voltageClasses.id, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Отрицательное', errMessage: 'В поле districtId должно быть введено положительное число.' },
    { active: true, districtId: 1.4, voltageClassesId: voltageClasses.id, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Дробное', errMessage: 'В поле districtId должно быть введено целое число.' },
    { active: true, districtId: 0, voltageClassesId: voltageClasses.id, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Ноль', errMessage: 'Значение поля districtId должно быть не меньше 1.' },
    { active: true, districtId: district.id + 1, voltageClassesId: voltageClasses.id, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Не существует в БД', errMessage: 'Выбранный districtId является недопустимым.' },
    //voltageClassesId
    { active: true, districtId: district.id, voltageClassesId: '1', objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Не число (строка)', errMessage: 'В поле voltageClassesId должно быть введено число.' },
    { active: true, districtId: district.id, voltageClassesId: true, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Не число (булево)', errMessage: 'В поле voltageClassesId должно быть введено число.' },
    { active: true, districtId: district.id, voltageClassesId: null, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Не число (null)', errMessage: 'Поле является обязательным.' },
    { active: true, districtId: district.id, voltageClassesId: {}, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Не число (объект)', errMessage: 'В поле voltageClassesId должно быть введено число.' },
    { active: true, districtId: district.id, voltageClassesId: -3, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Отрицательное', errMessage: 'В поле voltageClassesId должно быть введено положительное число.' },
    { active: true, districtId: district.id, voltageClassesId: 1.2, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Дробное', errMessage: 'В поле voltageClassesId должно быть введено целое число.' },
    { active: true, districtId: district.id, voltageClassesId: 0, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Ноль', errMessage: 'Значение поля voltageClassesId должно быть не меньше 1.' },
    { active: true, districtId: district.id, voltageClassesId: voltageClasses.id + 1, objectTypeId: objectType.id, name: 'Test', rdu: false, descrTest: 'districtId - Не существует в БД', errMessage: 'Выбранный voltageClassesId является недопустимым.' },
  ]

  test('{$i} - Проверка: {descrTest}.')
    .with(incorrectData)
    .run(async ({ assert }, testItem) => {
      const output = await createSubstationValidator.tryValidate(testItem)
      const data = output[0]?.messages

      assert.containsSubset(data, [{ message: testItem.errMessage }])
    })
})
