import { RolesEnum } from '#enums/roles'
import TypeWork from '#models/type_work'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('✅ Позитивные тесты. Тесты для проверки функционала "Виды работ".', (group) => {
  const urlApi = '/api/v1.0/types-work'
  let user: User
  let moderator: User
  let admin: User
  let recordTypeWork: TypeWork | null
  const testData = {
    name: 'Test type work',
  }
  const borderlineData = [
    { name: 'Te' },
    { name: 'Tes' },
    { name: 'a'.repeat(240) },
    { name: 'a'.repeat(239) }
  ]
  const updateBorderlineData = [
    { name: 'Up' },
    { name: 'Upt' },
    { name: 'u'.repeat(240) },
    { name: 'u'.repeat(239) }
  ]

  group.setup(async () => {
    user = await User.findOrFail(3)
    moderator = await User.findOrFail(2)
    admin = await User.findOrFail(1)
    recordTypeWork = await TypeWork.query().orderBy('id', 'desc').first()
  })
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Получить все записи с ролями: User, Moderator, Admin.')
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

  test('Добавление новой записи с корректными данными и ролями: Moderator, Admin.')
    .with(() => [moderator, admin])
    .run(async ({ client, assert }, userItem) => {
      const resp = await client
        .post(urlApi)
        .json(testData)
        .withGuard('api')
        .loginAs(userItem)

      // resp.dumpBody()
      resp.assertStatus(201)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      assert.properties(resp.body(), ['id', 'userId', 'name', 'createdAt', 'updatedAt'])
      resp.assertBodyContains({ name: testData.name })
      assert.equal(userItem.id, resp.body().userId)
    })

  test('Добавление новой записи с ролью Moderator и пограничными значениями.')
    // min - 2, max - 240
    .with(borderlineData)
    .run(async ({ client, assert }, testItem) => {
      const resp = await client
        .post(urlApi)
        .json(testItem)
        .withGuard('api')
        .loginAs(moderator)

      resp.assertStatus(201)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      assert.properties(resp.body(), ['id', 'userId', 'name', 'createdAt', 'updatedAt'])
      resp.assertBodyContains({ name: testItem.name })
      assert.equal(moderator.id, resp.body().userId)
      assert.equal(RolesEnum.MODERATOR, moderator.roleId)
    })

  test('Добавление новой записи с ролью Admin и пограничными значениями.')
    // min - 2, max - 240
    .with(borderlineData)
    .run(async ({ client, assert }, testItem) => {
      const resp = await client
        .post(urlApi)
        .json(testItem)
        .withGuard('api')
        .loginAs(admin)

      resp.assertStatus(201)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      assert.properties(resp.body(), ['id', 'userId', 'name', 'createdAt', 'updatedAt'])
      resp.assertBodyContains({ name: testItem.name })
      assert.equal(admin.id, resp.body().userId)
      assert.equal(RolesEnum.ADMIN, admin.roleId)
    })

  test('Обновление записи корректными данныи с ролями: Moderator, Admin.')
    .with(() => [moderator, admin])
    .run(async ({ client, assert }, testUser) => {
      const updData = {
        name: 'Update test data'
      }
      if (recordTypeWork) {
        const resp = await client
          .patch(`${urlApi}/${recordTypeWork.id}`)
          .json(updData)
          .withGuard('api')
          .loginAs(testUser)

        resp.assertStatus(200)
        resp.assertHeader('content-type', 'application/json; charset=utf-8')
        assert.equal(recordTypeWork.id, resp.body().id)
        assert.properties(resp.body(), ['id', 'userId', 'name', 'createdAt', 'updatedAt'])
        resp.assertBodyContains({ name: updData.name })
      }
    })

  test('Обновление данных пограничными значениями с ролью Moderator.')
    .with(updateBorderlineData)
    .run(async ({ client, assert }, testItem) => {
      if (recordTypeWork) {
        const resp = await client
          .patch(`${urlApi}/${recordTypeWork.id}`)
          .json(testItem)
          .withGuard('api')
          .loginAs(moderator)

        resp.assertStatus(200)
        resp.assertHeader('content-type', 'application/json; charset=utf-8')
        assert.equal(recordTypeWork.id, resp.body().id)
        assert.properties(resp.body(), ['id', 'userId', 'name', 'createdAt', 'updatedAt'])
        resp.assertBodyContains({ name: testItem.name })
      }
    })

  test('Удаление записи пользователем с ролью Admin.', async ({ client }) => {
    const respAddRecord = await client
      .post(urlApi)
      .json(testData)
      .withGuard('api')
      .loginAs(admin)
    const respDeleteRecord = await client
      .delete(`${urlApi}/${respAddRecord.body().id}`)
      .withGuard('api')
      .loginAs(admin)

      respDeleteRecord.assertStatus(204)
  })
})
