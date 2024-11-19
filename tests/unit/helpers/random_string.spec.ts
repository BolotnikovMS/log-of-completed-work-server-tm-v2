import { randomStr } from '#helpers/random_str'
import { test } from '@japa/runner'

test.group('Helpers random string', () => {
  test('Длина возвращаемой строки 5 символов', async ({ assert }) => {
    const str = randomStr()

    assert.equal(str.length, 5)
    assert.assert(str.length <= 5, 'Меньше или равно 5 символам')
  })
  test('Возвращаемое значение типа string', async ({ assert }) => {
    const str = randomStr()

    assert.isString(str)
  })
})
