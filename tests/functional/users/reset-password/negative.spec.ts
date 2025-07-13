import { RolesEnum } from '#enums/roles'
import { accessErrorMessages } from '#helpers/access_error_messages'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('⛔️ Негативные тесты. Тесты для проверки функционала "Сброса пароля пользователя".', group => {
  const userId = 3
  const urlApi = `/api/v1.0/users/reset-password/${userId}`
    const incorrectUrlApi = `/api/v1.0/users/reset-password/99999999`
  let admin: User
  let moderator: User
  let user: User
  // Для тестов прав пользователей
  const correctData = { password: 'qwertyuiop', passwordConfirm: 'qwertyuiop' }
  const incorrectData = [
    { password: '', passwordConfirm: '', message: { errors: [{ message: 'Поле является обязательным.' }] } },
    { password: '       ', passwordConfirm: '       ', message: { errors: [{ message: 'Поле является обязательным.' }] } },
    { password: 'Qwerty#W', message: { errors: [{ message: 'Поле: "пароля" и "подтверждение пароля" должны совпадать!' }] } },
    { password: 'qwer', message: { errors: [{ message: 'Минимальная длина 6 символа.' }] } },
    { password: 'Qwerty#W', passwordConfirm: 'Qwerty!1', message: { errors: [{ message: 'Поле: "пароля" и "подтверждение пароля" должны совпадать!' }] } },
    { password: 'Qwerty!@', passwordConfirm: '', message: { errors: [{ message: 'Поле: "пароля" и "подтверждение пароля" должны совпадать!' }] } },
    { password: '', passwordConfirm: 'qwerty!@', message: { errors: [{ message: 'Поле является обязательным.' }] } },
    { password: 'Qwer!', passwordConfirm: 'Qwer!', message: { errors: [{ message: 'Минимальная длина 6 символа.' }] } }, // 5
    { password: 'Qwertyuop12zd#@A', passwordConfirm: 'Qwertyuop12zd#@A', message: { errors: [{ message: 'Максимальная длина 15 символов.' }] } }, // 16
  ]

  group.setup(async () => {
    admin = await User.findOrFail(1)
    moderator = await User.findOrFail(2)
    user = await User.findOrFail(userId)
  })
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('Сброс пароля без авторизации.', async ({ client }) => {
    const resp = await client
      .patch(urlApi)
      .json(correctData)

    resp.assertStatus(401)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    resp.assertBodyContains({ errors: [{ message: 'Unauthorized access' }] })
  })

  test('Сброс пароля не администратором (User/Moderator).')
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

  test('Сброс пароля не существующего пользователя.', async ({ client, assert }) => {
    const resp = await client
      .patch(incorrectUrlApi)
      .json(correctData)
      .withGuard('api')
      .loginAs(admin)

    resp.assertStatus(404)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    assert.propertyVal(resp.body(), 'message', 'Row not found')
  })

  test('{$i} - Сброс пароля некорректным значением - "{password}" : "{passwordConfirm}"')
    .with(incorrectData)
    .run(async ({ client, assert }, item) => {
      const resp = await client
        .patch(urlApi)
        .json(item)
        .withGuard('api')
        .loginAs(admin)

      resp.assertStatus(422)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      assert.equal(RolesEnum.ADMIN, admin.roleId)
      resp.assertBodyContains(item.message)
    })
})
