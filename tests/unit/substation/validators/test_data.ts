import District from "#district/models/district"
import ObjectType from "#object_type/models/object_type"
import VoltageClass from "#voltage_class/models/voltage_class"

const district = await District.query().orderBy('id', 'desc').first()
const voltageClasses = await VoltageClass.query().orderBy('id', 'desc').first()
const objectType = await ObjectType.query().orderBy('id', 'desc').first()

export const positiveTestData = [
  { active: true, districtId: district?.id, voltageClassesId: voltageClasses?.id, objectTypeId: objectType?.id, name: 'Test', rdu: false, descrTest: 'Эквивалентность' },
  { active: false, districtId: district?.id, voltageClassesId: voltageClasses?.id, objectTypeId: objectType?.id, name: 'Te', rdu: false, descrTest: 'Левая граница' },
  { active: true, districtId: district?.id, voltageClassesId: voltageClasses?.id, objectTypeId: objectType?.id, name: 'T'.repeat(50), rdu: true, descrTest: 'Правая граница' },
  { active: true, districtId: district?.id, voltageClassesId: voltageClasses?.id, objectTypeId: objectType?.id, name: 'T'.repeat(49), rdu: true, descrTest: 'Значение до правой границы' },
  { active: true, districtId: district?.id, voltageClassesId: voltageClasses?.id, objectTypeId: objectType?.id, name: '    Test     ', rdu: true, descrTest: 'Значение с пробелами' },
]
export const positiveTestDataXSS = { active: true, districtId: district?.id, voltageClassesId: voltageClasses?.id, objectTypeId: objectType?.id, name: '<script>alert("1")</script>', rdu: false }

export const incorrectData = [
  // districtId
  {
    active: true,
    districtId: '1',
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false,
    descrTest: 'districtId - Не число (строка)',
    errMessage: 'В поле districtId должно быть введено число.'
  },
  {
    active: true,
    districtId: true,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false,
    descrTest: 'districtId - Не число (булево)',
    errMessage: 'В поле districtId должно быть введено число.'
  },
  {
    active: true,
    districtId: null,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: 'Test', rdu: false,
    descrTest: 'districtId - Не число (null)',
    errMessage: 'Поле является обязательным.'
  },
  {
    active: true,
    districtId: {},
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false,
    descrTest: 'districtId - Не число (объект)',
    errMessage: 'В поле districtId должно быть введено число.'
  },
  {
    active: true,
    districtId: -4,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false,
    descrTest: 'districtId - Отрицательное',
    errMessage: 'В поле districtId должно быть введено положительное число.'
  },
  {
    active: true,
    districtId: 1.4,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false,
    descrTest: 'districtId - Дробное',
    errMessage: 'В поле districtId должно быть введено целое число.'
  },
  {
    active: true,
    districtId: 0,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false,
    descrTest: 'districtId - Ноль',
    errMessage: 'Значение поля districtId должно быть не меньше 1.'
  },
  {
    active: true,
    districtId: district?.id! + 1,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false, descrTest: 'districtId - Не существует в БД',
    errMessage: 'Выбранный districtId является недопустимым.'
  },
  //voltageClassesId
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: '1',
    objectTypeId: objectType?.id,
    name: 'Test', rdu: false,
    descrTest: 'voltageClassesId - Не число (строка)',
    errMessage: 'В поле voltageClassesId должно быть введено число.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: true,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false,
    descrTest: 'voltageClassesId - Не число (булево)',
    errMessage: 'В поле voltageClassesId должно быть введено число.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: null,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false,
    descrTest: 'voltageClassesId - Не число (null)',
    errMessage: 'Поле является обязательным.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: {},
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false,
    descrTest: 'voltageClassesId - Не число (объект)',
    errMessage: 'В поле voltageClassesId должно быть введено число.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: -3,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false,
    descrTest: 'voltageClassesId - Отрицательное',
    errMessage: 'В поле voltageClassesId должно быть введено положительное число.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: 1.2,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false,
    descrTest: 'voltageClassesId - Дробное',
    errMessage: 'В поле voltageClassesId должно быть введено целое число.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: 0,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false,
    descrTest: 'voltageClassesId - Ноль', errMessage: 'Значение поля voltageClassesId должно быть не меньше 1.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id! + 1,
    objectTypeId: objectType?.id,
    name: 'Test',
    rdu: false, descrTest: 'voltageClassesId - Не существует в БД',
    errMessage: 'Выбранный voltageClassesId является недопустимым.'
  },
  // objectTypeId
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: '3',
    name: 'Test', rdu: false,
    descrTest: 'objectTypeId - Не число (строка)',
    errMessage: 'В поле objectTypeId должно быть введено число.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: false,
    name: 'Test',
    rdu: false,
    descrTest: 'objectTypeId - Не число (булево)',
    errMessage: 'В поле objectTypeId должно быть введено число.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: null,
    name: 'Test',
    rdu: false,
    descrTest: 'objectTypeId - Не число (null)',
    errMessage: 'Поле является обязательным.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: {},
    name: 'Test',
    rdu: false,
    descrTest: 'objectTypeId - Не число (объект)',
    errMessage: 'В поле objectTypeId должно быть введено число.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: -2,
    name: 'Test',
    rdu: false,
    descrTest: 'objectTypeId - Отрицательное',
    errMessage: 'В поле objectTypeId должно быть введено положительное число.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: 4.3,
    name: 'Test',
    rdu: false,
    descrTest: 'objectTypeId - Дробное',
    errMessage: 'В поле objectTypeId должно быть введено целое число.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: 0,
    name: 'Test',
    rdu: false,
    descrTest: 'objectTypeId - Ноль',
    errMessage: 'Значение поля objectTypeId должно быть не меньше 1.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id! + 1,
    name: 'Test',
    rdu: false,
    descrTest: 'objectTypeId - Не существует в БД',
    errMessage: 'Выбранный objectTypeId является недопустимым.'
  },
  // name
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: 'T',
    rdu: false,
    descrTest: 'name - Менее 2 символов',
    errMessage: 'Минимальная длина 2 символа.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: 'T'.repeat(55),
    rdu: false,
    descrTest: 'name - Более 50 символов',
    errMessage: 'Максимальная длина 50 символов.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: {},
    rdu: false,
    descrTest: 'name - Не строка (объект)',
    errMessage: 'Поле name должно быть строкой.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: 432,
    rdu: false,
    descrTest: 'name - Не строка (число)',
    errMessage: 'Поле name должно быть строкой.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: null,
    rdu: false,
    descrTest: 'name - Не строка (null)',
    errMessage: 'Поле является обязательным.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: true,
    rdu: false,
    descrTest: 'name - Не строка (булево)',
    errMessage: 'Поле name должно быть строкой.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: '',
    rdu: false,
    descrTest: 'name - Пустая строка',
    errMessage: 'Минимальная длина 2 символа.'
  },
  {
    active: true,
    districtId: district?.id,
    voltageClassesId: voltageClasses?.id,
    objectTypeId: objectType?.id,
    name: '    ',
    rdu: false,
    descrTest: 'name - Только пробелы',
    errMessage: 'Минимальная длина 2 символа.'
  },
]
