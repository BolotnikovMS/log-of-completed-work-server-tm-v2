import { RolesEnum } from '#shared/enums/roles'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import TypeWork from '#type_work/models/type_work'
import User from '#user/models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('⛔️ Негативные тесты. Тесты для проверки функционала "Виды работ".', (group) => {
  const urlApi = '/api/v1.0/types-work'
  let user: User
  let moderator: User
  let admin: User
  let recordTypeWork: TypeWork | null
  const typeWorkTestData = {
    name: 'Test'
  }
  const updTypeWorkData = {
    name: 'Update test data'
  }
  const incorrectData = [
    { name: 'T', errorMessages: { errors: [{ message: 'Минимальная длина 2 символа.' }] } },
    { name: 'a'.repeat(51), errorMessages: { errors: [{ message: 'Максимальная длина 51 символ.' }] } },
    { name: '', errorMessages: { errors: [{ message: 'Поле является обязательным.' }] } },
    { name: '     ', errorMessages: { errors: [{ message: 'Минимальная длина 2 символа.' }] } }
  ]

  group.setup(async () => {
    user = await User.findOrFail(3)
    moderator = await User.findOrFail(2)
    admin = await User.findOrFail(1)
    recordTypeWork = await TypeWork.query().orderBy('id', 'desc').first()
  })
  group.each.setup(async () => testUtils.db().withGlobalTransaction())

  test('Получить все записи без токена.', async ({ client }) => {
    const resp = await client.get(urlApi)

    resp.assertStatus(401)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    resp.assertBodyContains({ errors: [{ message: 'Unauthorized access' }] })
  })

  test('Добавление новой записи с ролью User.', async ({ client, assert }) => {
    const resp = await client
      .post(urlApi)
      .json(typeWorkTestData)
      .withGuard('api')
      .loginAs(user)

    resp.assertStatus(403)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    resp.assertBodyContains({ message: accessErrorMessages.create })
    assert.equal(RolesEnum.USER, user.roleId)
  })

  test('Добавление новой записи с ролью Moderator и некорректными значениями.')
    // min - 2, max - 50
    .with(incorrectData)
    .run(async ({ client, assert }, testItem) => {
      const resp = await client
        .post(urlApi)
        .json(testItem)
        .withGuard('api')
        .loginAs(moderator)

      resp.assertStatus(422)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      resp.assertBodyContains(testItem.errorMessages)
      assert.equal(RolesEnum.MODERATOR, moderator.roleId)
    })

  test('Добавление новой записи с ролью Admin и некорректными значениями.')
    // min - 2, max - 50
    .with(incorrectData)
    .run(async ({ client, assert }, testItem) => {
      const resp = await client
        .post(urlApi)
        .json(testItem)
        .withGuard('api')
        .loginAs(admin)

      resp.assertStatus(422)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      resp.assertBodyContains(testItem.errorMessages)
      assert.equal(RolesEnum.ADMIN, admin.roleId)
    })

  test('Удаление записи с ролью User или Moderator.')
    .with(() => [user, moderator])
    .run(async ({ client, assert }, userItem) => {
      if (recordTypeWork) {
        const resp = await client
          .delete(`${urlApi}/${recordTypeWork.id}`)
          .withGuard('api')
          .loginAs(userItem)

        resp.assertStatus(403)
        resp.assertHeader('content-type', 'application/json; charset=utf-8')
        resp.assertBodyContains({ message: accessErrorMessages.delete })
        assert.includeMembers([RolesEnum.USER, RolesEnum.MODERATOR], [userItem.roleId])
      }
    })

  test('Редактирование записи с ролью User.', async ({ client, assert }) => {
    if (recordTypeWork) {
      const resp = await client
        .patch(`${urlApi}/${recordTypeWork.id}`)
        .json(updTypeWorkData)
        .withGuard('api')
        .loginAs(user)

      resp.assertStatus(403)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      resp.assertBodyContains({ message: accessErrorMessages.edit })
      assert.equal(RolesEnum.USER, user.roleId)
    }
  })
})
