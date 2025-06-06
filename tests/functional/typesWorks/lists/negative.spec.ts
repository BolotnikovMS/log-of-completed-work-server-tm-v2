import { accessErrorMessages } from '#helpers/access_error_messages'
import TypeWork from '#models/type_work'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('⛔️ Негативные тесты. Тесты для проверки функционала "Виды работ".', (group) => {
  const urlApi = '/api/v1.0/types-work'
  let user: User
  let moderator: User
  let recordTypeWork: TypeWork | null
  const updTypeWorkData = {
    name: 'Update test data'
  }

  group.setup(async () => {
    user = await User.findOrFail(3)
    moderator = await User.findOrFail(2)
    recordTypeWork = await TypeWork.query().orderBy('id', 'desc').first()
  })
  group.each.setup(async () => testUtils.db().withGlobalTransaction())

  test('Получить все записи без токена.', async ({ client }) => {
    const resp = await client.get(urlApi)

    resp.assertStatus(401)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    resp.assertBodyContains({ errors: [{ message: 'Unauthorized access' }] })
  })

  test('Добавление новой записи с ролью User.', async ({ client }) => {
    const testData = {
      name: 'Test'
    }
    const resp = await client
      .post(urlApi)
      .json(testData)
      .withGuard('api')
      .loginAs(user)

    resp.assertStatus(403)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    resp.assertBodyContains({ message: accessErrorMessages.create })
  })

  test('Добавление новой записи с корректным токеном, ролью Moderator и некорректными значениями.')
    // min - 2, max - 240
    .with([
      { name: 'T', errorMessages: { errors: [{ message: 'Минимальная длина 2 символа.' }] } },
      { name: 'a'.repeat(241), errorMessages: { errors: [{ message: 'Максимальная длина 240 символов.' }] } },
      { name: '', errorMessages: { errors: [{ message: 'Поле является обязательным.' }] } },
      { name: '     ', errorMessages: { errors: [{ message: 'Минимальная длина 2 символа.' }] } }
    ])
    .run(async ({ client }, testItem) => {
      const resp = await client
        .post(urlApi)
        .json(testItem)
        .withGuard('api')
        .loginAs(moderator)

      resp.assertStatus(422)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      resp.assertBodyContains(testItem.errorMessages)
    })

  test('Удаление записи с ролью User или Moderator.')
    .with(() =>  [user, moderator])
    .run(async ({ client }, userItem) => {

      if (recordTypeWork) {
        const resp = await client
          .delete(`${urlApi}/${recordTypeWork.id}`)
          .withGuard('api')
          .loginAs(userItem)

        resp.assertStatus(403)
        resp.assertHeader('content-type', 'application/json; charset=utf-8')
        resp.assertBodyContains(accessErrorMessages.delete)
      }
    })

  test('Редактирование записи с ролью User.', async ({ client }) => {
    if (recordTypeWork) {
      const resp = await client
        .patch(`${urlApi}/${recordTypeWork.id}`)
        .json(updTypeWorkData)
        .withGuard('api')
        .loginAs(user)

      resp.assertStatus(403)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      resp.assertBodyContains(accessErrorMessages.edit)
    }
  })
})
