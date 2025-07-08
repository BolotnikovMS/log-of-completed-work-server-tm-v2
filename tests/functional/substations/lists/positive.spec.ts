import { RolesEnum } from '#enums/roles'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('✅ Позитивные тесты. Тесты для проверки функционала "Обновления ключа связи с ЖД".', group => {
  const id = 4
  const urlApi = `/api/v1.0/substations/${id}/add-key-defects`
  let admin: User
  const correctData = [
    { keyDefectSubstation: 1, resultTest: 1 },
    { keyDefectSubstation: null, resultTest: null },
    { keyDefectSubstation: '', resultTest: null },
  ]

  group.setup(async () => {
    admin = await User.findOrFail(1)
  })
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('{$i} - Обновление ключа валидным значением(Установка/сброс ключа) - "{keyDefectSubstation}".')
    .with(correctData)
    .run(async ({ client, assert }, item) => {
      const resp = await client
        .patch(urlApi)
        .json(item)
        .withGuard('api')
        .loginAs(admin)

      resp.assertStatus(200)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      assert.equal(RolesEnum.ADMIN, admin.roleId)
      assert.isObject(resp.body())
      assert.properties(resp.body(), ['id', 'keyDefectSubstation'])
      assert.equal(id, resp.body().id)
      assert.equal(item.resultTest, resp.body().keyDefectSubstation)
    })
})
