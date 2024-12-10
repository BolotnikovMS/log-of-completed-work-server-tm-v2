import { accessErrorMessages } from '#helpers/access_error_messages'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Тесты для проверки функционала "Районов"', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  const urlApi = '/api/v1.0/districts'

  test('✅ Получить все записи с корректными токеном', async ({ client, assert }) => {
    const user = await User.findOrFail(2)
    const resp = await client
      .get(urlApi)
      .withGuard('api')
      .loginAs(user)

    resp.assertStatus(200)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    assert.isObject(resp.body())
  })

  test('⛔️ Получить все записи районов без токена', async ({ client }) => {
    const resp = await client.get(urlApi)

    resp.assertStatus(401)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    resp.assertBodyContains({ errors: [{ message: 'Unauthorized access' }] })
  })

  test('✅ Добавление новой записи с корректным токеном, данными и правами', async ({ client, assert }) => {
    const user = await User.findOrFail(1)
    const testDistrict = {
      name: 'Test distric',
      shortName: 'Test'
    }
    const resp = await client
      .post(urlApi)
      .json(testDistrict)
      .withGuard('api')
      .loginAs(user)

    // resp.dumpBody()
    resp.assertStatus(201)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    assert.isNumber(resp.body().id)
  })

  test('⚠️ Добавление новой записи с корректным токеном, правами и пограничными значениями')
    .with([
      { name: 'Te', shortName: 'Te' },
      { name: 'ruhhbgiueugevlafapixjoodnxwlspmigntlicdswiinozpbrcotjfimxwacjyszwegrjjiwoqqxyzweqacaauhlpciuvwwjrvssrrkqzaeeudsbjfazzzzthvyvuqtnnvoaweeympuurzqtvqmnbhoiejbjejjxwauoeemhquwpnxbumggvhoysxdizvwaoapomdxraawaecwfkqmhssuildlpnwrpicbdqyxcryedihhwe', shortName: 'ruhhbgiueugevlafapixjoodnxwlspmigntlicdswiinozpbrcotjfimxwacjyszwegrjjiwoqqxyzweqacaauhlpciuvwwjrvssrrkqzaeeudsbjfazzzzthvyvuqtnnvoaweeympuurzqtvqmnbhoiejbjejjxwauoeemhquwpnxbumggvhoysxdizvwaoapomdxraawaecwfkqmhssuildlpnwrpicbdqyxcryedihhwe' },
      { name: 'ruhhbgiueugevlafapixjoodnxwlspmigntlicdswiinozpbrcotjfimxwacjyszwegrjjiwoqqxyzweqacaauhlpciuvwwjrvssrrkqzaeeudsbjfazzzzthvyvuqtnnvoaweeympuurzqtvqmnbhoiejbjejjxwauoeemhquwpnxbumggvhoysxdizvwaoapomdxraawaecwfkqmhssuildlpnwrpicbdqyxcryedihhwe  ', shortName: 'ruhhbgiueugevlafapixjoodnxwlspmigntlicdswiinozpbrcotjfimxwacjyszwegrjjiwoqqxyzweqacaauhlpciuvwwjrvssrrkqzaeeudsbjfazzzzthvyvuqtnnvoaweeympuurzqtvqmnbhoiejbjejjxwauoeemhquwpnxbumggvhoysxdizvwaoapomdxraawaecwfkqmhssuildlpnwrpicbdqyxcryedihhwe  ' },
    ])
    .run(async ({ client }, testItem) => {
      const user = await User.findOrFail(1)
      const resp = await client
        .post(urlApi)
        .json(testItem)
        .withGuard('api')
        .loginAs(user)

      // resp.dumpBody()
      resp.assertStatus(201)
      resp.assertHeader('content-type', 'application/json; charset=utf-8')
      resp.assertBodyContains({ name: testItem.name.trim(), shortName: testItem.shortName.trim() })
    })

  test('⛔️ Добавление новой записи с корректным токеном, правами и некорректными данными')
    .with([
      { name: 'T', shortName: 'T', errorMessages: { errors: [{ message: 'Минимальная длина 2 символа.' }, { message: 'Минимальная длина 2 символа.' }] } },
      { name: 'npspjgunibblwreuzjcgghqsbgvfyzttiusohctfcdvjofpaatndbzklunwzdvmutxamzcfuyccfblvpiioxswalzqhuxuzihtkgwiilogutohdayekovbwnpbtvvlfovhpqtanbmumzccgacjxfpakvcwejqknfkarncrziifhtpqbuvgdogpeuuwbwvvcccynirctmcdbgrwsarrdhiorobmrfrxswrepxotsqfsemezvtel', shortName: 'npspjgunibblwreuzjcgghqsbgvfyzttiusohctfcdvjofpaatndbzklunwzdvmutxamzcfuyccfblvpiioxswalzqhuxuzihtkgwiilogutohdayekovbwnpbtvvlfovhpqtanbmumzccgacjxfpakvcwejqknfkarncrziifhtpqbuvgdogpeuuwbwvvcccynirctmcdbgrwsarrdhiorobmrfrxswrepxotsqfsemezvtel', errorMessages: { errors: [{ message: 'Максимальная длина 240 символов.' }] } },
      { name: '', shortName: '', errorMessages: { errors: [{ message: 'Поле является обязательным.' }] } },
      { name: '   ', shortName: '    ', errorMessages: { errors: [{ message: 'Минимальная длина 2 символа.' }] } },
    ])
    .run(async ({ client }, testItem) => {
      const user = await User.findOrFail(1)
      const resp = await client
        .post(urlApi)
        .json(testItem)
        .withGuard('api')
        .loginAs(user)

      resp.assertStatus(422)
      resp.assertBodyContains(testItem.errorMessages)
    })

  test('⛔️ Добавление новой записи с корректным токеном, но без прав', async ({ client }) => {
    const user = await User.findOrFail(2)
    const testDistrict = {
      name: 'Test distric',
      shortName: 'Test'
    }
    const resp = await client
      .post(urlApi)
      .json(testDistrict)
      .withGuard('api')
      .loginAs(user)

    // resp.dumpBody()
    resp.assertStatus(403)
    resp.assertBodyContains({ message: accessErrorMessages.create })
  })
})
