import { RolesEnum } from '#shared/enums/roles'
import User from '#user/models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import db from '@adonisjs/lucid/services/db'
import { test } from '@japa/runner'
import type { TDatasetsCreateWork } from '../types.js'

test.group('✅ Позитивные тесты. Тесты для проверки функционала "Добавление выполненной работы".', group => {
  group.setup(async () => {
    const substationId: number = await db.rawQuery('SELECT id FROM substations ORDER BY RANDOM() LIMIT 1').then(data => data[0].id)
    const workProducerId: number = await db.rawQuery('SELECT id FROM users WHERE active != 0 ORDER BY RANDOM() LIMIT 1').then(data => data[0].id)
    const typeWorkId: number = await db.rawQuery('SELECT id FROM type_works ORDER BY RANDOM() LIMIT 1').then(data => data[0].id)
    user = await User.findOrFail(3)
    moderator = await User.findOrFail(2)
    admin = await User.findOrFail(1)
    correctData = [
      {
        testData: 1,
        expectedProperties: ['id', 'userId', 'substationId', 'description', 'note', 'workProducerId', 'typeWorkId', 'dateCompletion', 'inControl', 'createdAt', 'updatedAt'],
        payload: {
          substationId: substationId,
          description: "Test api new work",
          note: "Test api note",
          workProducerId: workProducerId,
          typeWorkId: typeWorkId,
          dateCompletion: "2025-07-23",
          inControl: true
        }
      },
      {
        testData: 2,
        expectedProperties: ['id', 'userId', 'substationId', 'description', 'workProducerId', 'typeWorkId', 'dateCompletion', 'createdAt', 'updatedAt'],
        payload: {
          substationId: substationId,
          description: "Test api new work 2",
          workProducerId: workProducerId,
          typeWorkId: typeWorkId,
          dateCompletion: "2025-07-23"
        }
      },
      {
        testData: 3,
        expectedProperties: ['id', 'userId', 'substationId', 'description', 'note', 'workProducerId', 'typeWorkId', 'dateCompletion', 'createdAt', 'updatedAt'],
        payload: {
          substationId: substationId,
          description: "Te",
          note: "Te",
          workProducerId: workProducerId,
          typeWorkId: typeWorkId,
          dateCompletion: "2025-07-23"
        },
      },
      {
        testData: 4,
        expectedProperties: ['id', 'userId', 'substationId', 'description', 'note', 'workProducerId', 'typeWorkId', 'dateCompletion', 'createdAt', 'updatedAt'],
        payload: {
          substationId: substationId,
          description: 'T'.repeat(1000),
          note: 'T'.repeat(1000),
          workProducerId: workProducerId,
          typeWorkId: typeWorkId,
          dateCompletion: "2025-07-23"
        },
      }
    ]
  })
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  const urlApi = '/api/v1.0/completed-works'
  let user: User
  let moderator: User
  let admin: User
  let correctData: TDatasetsCreateWork[]

  test('{$i} - Добавление выполненной работы c ролью User. - Набор данных: "{testData}"')
    .with(() => correctData)
    .run(async ({ client, assert }, dataItem) => {
      const resp = await client
        .post(urlApi)
        .json(dataItem.payload)
        .withGuard('api')
        .loginAs(user)

      resp.assertStatus(201)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      assert.equal(RolesEnum.USER, user.roleId)
      assert.equal(resp.body().userId, user.id)
      assert.properties(resp.body(), dataItem.expectedProperties)
      resp.assertBodyContains({
        substationId: dataItem.payload.substationId,
        workProducerId: dataItem.payload.workProducerId,
        description: dataItem.payload.description,
        typeWorkId: dataItem.payload.typeWorkId
      })
    })

  test('{$i} - Добавление выполненной работы c ролью Moderator. - Набор данных: "{testData}"')
    .with(() => correctData)
    .run(async ({ client, assert }, dataItem) => {
      const resp = await client
        .post(urlApi)
        .json(dataItem.payload)
        .withGuard('api')
        .loginAs(moderator)

      resp.assertStatus(201)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      assert.equal(RolesEnum.MODERATOR, moderator.roleId)
      assert.equal(resp.body().userId, moderator.id)
      assert.properties(resp.body(), dataItem.expectedProperties)
      resp.assertBodyContains({
        substationId: dataItem.payload.substationId,
        workProducerId: dataItem.payload.workProducerId,
        description: dataItem.payload.description,
        typeWorkId: dataItem.payload.typeWorkId
      })
    })

  test('{$i} - Добавление выполненной работы c ролью Admin. - Набор данных: "{testData}"')
    .with(() => correctData)
    .run(async ({ client, assert }, dataItem) => {
      const resp = await client
        .post(urlApi)
        .json(dataItem.payload)
        .withGuard('api')
        .loginAs(admin)

      resp.assertStatus(201)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      assert.equal(RolesEnum.ADMIN, admin.roleId)
      assert.equal(resp.body().userId, admin.id)
      assert.properties(resp.body(), dataItem.expectedProperties)
      resp.assertBodyContains({
        substationId: dataItem.payload.substationId,
        workProducerId: dataItem.payload.workProducerId,
        description: dataItem.payload.description,
        typeWorkId: dataItem.payload.typeWorkId
      })
    })
})
