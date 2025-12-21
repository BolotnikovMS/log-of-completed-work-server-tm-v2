import { RolesEnum } from '#shared/enums/roles'
import User from '#user/models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('✅ Позитивные тесты. Тесты для проверки функционала "Сброса пароля пользователя".', group => {
  const userId = 3
  const urlApi = `/api/v1.0/users/reset-password/${userId}`
  let admin: User
  let user: User
  const correctData = [
    { password: 'qwertyuiop', passwordConfirm: 'qwertyuiop' }, // 10
    { password: 'qwerty', passwordConfirm: 'qwerty' }, // 6
    { password: 'qwertyuop12zd#@', passwordConfirm: 'qwertyuop12zd#@' }, // 15
  ]

  group.setup(async () => {
    admin = await User.findOrFail(1)
    user = await User.findOrFail(userId)
  })
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('{$i} - Сброс пароля администратором и корректными значениями - "{password}".')
    .with(correctData)
    .run(async ({ client, assert }, item) => {
      const resp = await client
        .patch(urlApi)
        .json(item)
        .withGuard('api')
        .loginAs(admin)

      resp.assertStatus(200)
      resp.assertHeader('content-type', 'text/plain; charset=utf-8')
      assert.equal(RolesEnum.ADMIN, admin.roleId)
      assert.isObject(user)
      assert.equal(userId, user.id)
      assert.isString(resp.text())
      assert.include(resp.text(), 'Пароль пользователя успешно изменен!')
    })
})
