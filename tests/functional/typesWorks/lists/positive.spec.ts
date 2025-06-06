import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('✅ Позитивные тесты. Тесты для проверки функционала "Виды работ".', (group) => {
  const urlApi = '/api/v1.0/types-work'
  let user: User
  let moderator: User
  let admin: User

  group.setup(async () => {
    user = await User.findOrFail(3)
    moderator = await User.findOrFail(2)
    admin = await User.findOrFail(1)
  })
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Получить все записи с корректным токином и ролями: User, Moderator, Admin.')
    .with(() => [user, moderator, admin])
    .run(async ({ client, assert }, userItem) => {
      const resp = await client
        .get(urlApi)
        .withGuard('api')
        .loginAs(userItem)

      resp.assertStatus(200)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      assert.isArray(resp.body().data)
    })

  test('Добавление новой записи с корректным токеном, данными и ролями: Moderator, Admin.')
    .with(() => [moderator, admin])
    .run(async ({ client, assert }, userItem) => {
      const testData = {
        name: 'Test type work',
      }
      const resp = await client
        .post(urlApi)
        .json(testData)
        .withGuard('api')
        .loginAs(userItem)

      // resp.dumpBody()
      resp.assertStatus(201)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      assert.properties(resp.body(), ['id', 'userId', 'name'])
      resp.assertBodyContains({ name: testData.name })
    })

  test('Добавление новой записи с корректным токеном, ролью Moderator и пограничными значениями.')
    // min - 2, max - 240
    .with([
      { name: 'Te' },
      { name: 'Tes' },
      { name: 'a'.repeat(240) },
      { name: 'a'.repeat(239) }
     ])
    .run(async ({ client, assert }, testData) => {
      const resp = await client
        .post(urlApi)
        .json(testData)
        .withGuard('api')
        .loginAs(moderator)

      resp.assertStatus(201)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      assert.properties(resp.body(), ['id', 'userId', 'name'])
      resp.assertBodyContains({ name: testData.name })
    })

  // Обновление записи Moderator, Admin

  // Удаление записи Admin
})
