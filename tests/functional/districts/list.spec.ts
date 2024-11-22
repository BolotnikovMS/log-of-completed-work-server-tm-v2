import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Districts list test', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Получить все записи районов с корректными токеном', async ({ client, assert }) => {
    const user = await User.findOrFail(2)
    const resp = await client.get('/api/v1.0/districts').withGuard('api').loginAs(user)

    resp.assertStatus(200)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    assert.isObject(resp.body())
  })

  test('Получить все записи районов без токена', async ({ client }) => {
    const resp = await client.get('/api/v1.0/districts')

    resp.assertStatus(401)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    resp.assertBodyContains({ errors: [{ message: 'Unauthorized access' }] })
  })

  test('Добавить новый район с корректным токеном и правами', async ({ client, assert }) => {
    const user = await User.findOrFail(1)
    const testDistrict = {
      name: 'Test distric',
      shortName: 'Test'
    }
    const resp = await client
      .post('/api/v1.0/districts')
      .json(testDistrict)
      .withGuard('api')
      .loginAs(user)

    // resp.dumpBody()
    resp.assertStatus(201)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    assert.isNumber(resp.body().id)
  })
})
