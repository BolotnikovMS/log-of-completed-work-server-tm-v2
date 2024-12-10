import { accessErrorMessages } from '#helpers/access_error_messages'
import District from '#models/district'
import HeadController from '#models/head_controller'
import TypeKp from '#models/type_kp'
import User from '#models/user'
import VoltageClass from '#models/voltage_class'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

let districts: District[], voltageClasses: VoltageClass[], typeKp: TypeKp[], headController: HeadController[]

test.group('Тесты для проверки функционала "Объектов"', async (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())
  group.each.setup(async () => {
    districts = await District.query()
    voltageClasses = await VoltageClass.query()
    typeKp = await TypeKp.query()
    headController = await HeadController.query()
  })
  // group.each.teardown(() => {
  //   districts = []
  //   voltageClasses = []
  //   typeKp = []
  //   headController = []
  // })

  const urlApi = '/api/v1.0/substations'

  test('✅ Получить все записи с корректными токеном', async ({ client, assert }) => {
    const user = await User.findOrFail(2)
    const resp = await client
      .get(urlApi)
      .withGuard('api')
      .loginAs(user)

    resp.assertStatus(200)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    assert.isObject(resp.body())
    assert.isNotNull(resp)
  })

  test('⛔️ Получить все записи объектов без токена', async ({ client }) => {
    const resp = await client.get(urlApi)

    resp.assertStatus(401)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    resp.assertBodyContains({ errors: [{ message: 'Unauthorized access' }] })
  })

  test('✅ Добавление новой записи с корректным токеном, данными и правами', async ({ client, assert, }) => {
    const user = await User.findOrFail(1)
    const testData = {
      districtId: districts[Math.floor(Math.random() * districts.length)].id,
      voltageClassesId: voltageClasses[Math.floor(Math.random() * voltageClasses.length)].id,
      typeKpId: typeKp[Math.floor(Math.random() * typeKp.length)].id,
      headControllerId: headController[Math.floor(Math.random() * headController.length)].id,
      name: 'Test',
    }
    const resp = await client
      .post(urlApi)
      .json(testData)
      .withGuard('api')
      .loginAs(user)

    // resp.dumpBody()
    resp.assertStatus(201)
    resp.assertHeader('content-type', 'application/json; charset=utf-8')
    assert.isNumber(resp.body().id)
  })

  test('⚠️ Добавление новой записи с корректным токеном, правами и пограничными значениями')
    .with(async () => [
      {
        districtId: districts[Math.floor(Math.random() * districts.length)].id,
        voltageClassesId: voltageClasses[Math.floor(Math.random() * voltageClasses.length)].id,
        typeKpId: typeKp[Math.floor(Math.random() * typeKp.length)].id,
        headControllerId: headController[Math.floor(Math.random() * headController.length)].id,
        name: 'hnjxjmbwlaeuvstachywkueodmfwbmwjtprcapbatjvuxqwysvmuyrbanemfbnxotshdhckdrjkiaeexfmfzmuzhgrbjzqikbytrkyskgjbdmhutdpxtrxqzzyboazlycyyixuqoimsdlbbvbdbijlkmquprhdmukqjyoiwblyjxtkjklzljvrmztwghgjdaveppkyoeeectljshwvzuhgkgxowvngkifupeedxuhkwjtjtc',
        active: true,
        rdu: false,
      },
      {
        districtId: districts[Math.floor(Math.random() * districts.length)].id,
        voltageClassesId: voltageClasses[Math.floor(Math.random() * voltageClasses.length)].id,
        typeKpId: typeKp[Math.floor(Math.random() * typeKp.length)].id,
        headControllerId: headController[Math.floor(Math.random() * headController.length)].id,
        name: 'Te',
        active: true,
        rdu: false,
      },
      {
        districtId: districts[Math.floor(Math.random() * districts.length)].id,
        voltageClassesId: voltageClasses[Math.floor(Math.random() * voltageClasses.length)].id,
        typeKpId: typeKp[Math.floor(Math.random() * typeKp.length)].id,
        headControllerId: headController[Math.floor(Math.random() * headController.length)].id,
        name: 'Te',
        active: false,
        rdu: true,
      },
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
      resp.assertBodyContains(testItem)
    })

  test('⛔️ Добавление новой записи с корректным токеном, правами и некорректными данными')
    .with([
      {
        districtId: 999,
        voltageClassesId: 999,
        typeKpId: 999,
        headControllerId: 999,
        name: 'T',
        respStatus: 422
      },
      {
        districtId: 999,
        voltageClassesId: 999,
        typeKpId: 999,
        headControllerId: 999,
        name: 'hnjxjmbwlaeuvstachywkueodmfwbmwjtprcapbatjvuxqwysvmuyrbanemfbnxotshdhckdrjkiaeexfmfzmuzhgrbjzqikbytrkyskgjbdmhutdpxtrxqzzyboazlycyyixuqoimsdlbbvbdbijlkmquprhdmukqjyoiwblyjxtkjklzljvrmztwghgjdaveppkyoeeectljshwvzuhgkgxowvngkifupeedxuhkwjtjtc1111',
        respStatus: 422
      },
      {
        districtId: 999,
        voltageClassesId: 1,
        typeKpId: 1,
        headControllerId: 1,
        name: 'Test',
        respStatus: 404
      }
    ])
    .run(async ({ client, assert }, testItem) => {
      const user = await User.findOrFail(1)
      const resp = await client
        .post(urlApi)
        .json(testItem)
        .withGuard('api')
        .loginAs(user)

      // resp.dumpBody()
      assert.equal(resp.status(), testItem.respStatus)
    })


  test('⛔️ Добавление новой записи с корректным токеном, но без прав', async ({ client }) => {
    const user = await User.findOrFail(2)
    const testData = {
      districtId: districts[Math.floor(Math.random() * districts.length)].id,
      voltageClassesId: voltageClasses[Math.floor(Math.random() * voltageClasses.length)].id,
      typeKpId: typeKp[Math.floor(Math.random() * typeKp.length)].id,
      headControllerId: headController[Math.floor(Math.random() * headController.length)].id,
      name: 'Test',
    }

    const resp = await client
      .post(urlApi)
      .json(testData)
      .withGuard('api')
      .loginAs(user)

    // resp.dumpBody()
    resp.assertStatus(403)
    resp.assertBodyContains({ message: accessErrorMessages.create })
  })
})
