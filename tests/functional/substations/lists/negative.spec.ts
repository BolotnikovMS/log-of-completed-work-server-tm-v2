import { RolesEnum } from '#enums/roles'
import { accessErrorMessages } from '#helpers/access_error_messages'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('⛔️ Негативные тесты. Тесты для проверки функционала "Обновления ключа связт с ЖД".', group => {
  const id = 4
  const urlApi = `/api/v1.0/substations/${id}/add-key-defects`
  const incorrectUrlApi = `/api/v1.0/substations/999999/add-key-defects`
  let user: User
  let moderator: User
  let admin: User
  // Для проверки прав пользователя и некорректного id записи
  const correctData = { keyDefectSubstation: 1 }
  // Данные для негативных проверок
  const incorrectData = [
    { keyDefectSubstation: -1 },
    { keyDefectSubstation: 1.5 },
    { keyDefectSubstation: 0 },
    { keyDefectSubstation: 'abc' },
    { },
    { keyDefectSubstation: true }
  ]

  group.setup(async () => {
    user = await User.findOrFail(3)
    moderator = await User.findOrFail(2)
    admin = await User.findOrFail(1)
  })
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Обновление ключа без авторизации.', async ({ client }) => {
    const resp = await client
      .patch(urlApi)
      .json(correctData)

    resp.assertStatus(401)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    resp.assertBodyContains({ errors: [{ message: 'Unauthorized access' }] })
  })

  test('Обновление ключа с ролью User, Moderator.')
    .with(() => [user, moderator])
    .run(async ({ client, assert }, userItem) => {
      const resp = await client
        .patch(urlApi)
        .json(correctData)
        .withGuard('api')
        .loginAs(userItem)

      resp.assertStatus(403)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      assert.includeDeepMembers([RolesEnum.USER, RolesEnum.MODERATOR], [userItem.roleId])
      resp.assertBodyContains({ message: accessErrorMessages.noRights })
    })

  test('Обновление несуществующей записи.', async ({ client, assert }) => {
    const resp = await client
      .patch(incorrectUrlApi)
      .json(correctData)
      .withGuard('api')
      .loginAs(admin)

    resp.assertStatus(404)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    assert.propertyVal(resp.body(), 'message', 'Row not found')
  })

  test('Обновление ключа некорректными значениями.')
    .with(incorrectData)
})
