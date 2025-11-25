import type { BaseQueryParams } from '#shared/interfaces/query_params'
import type { CreateTelemechanicsDevice, UpdateTelemechanicsDevice } from '#telemechanic_device/interfaces/telemechanics_device'
import TelemechanicsDevice from '#telemechanic_device/models/telemechanics_device'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class TelemechanicsDeviceService {
  static async findAll(filters: BaseQueryParams): Promise<ModelPaginatorContract<TelemechanicsDevice>> {
    const { page, limit } = filters
    const telemechanicsDevices = await TelemechanicsDevice.query()
      .preload('substation', (query) => {
        query.preload('voltage_class')
        query.preload('object_type')
      })
      .preload('type_kp')
      .preload('head_controller')
      .paginate(page!, limit)

    return telemechanicsDevices
  }

  static async findById(id: number): Promise<TelemechanicsDevice> {
    const telemechanicsDevice = await TelemechanicsDevice.findOrFail(id)

    return telemechanicsDevice
  }

  static async findInfoById(id: number) {
    const telemechanicsDevice = await TelemechanicsDevice
      .query()
      .where('id', '=', id)
      .firstOrFail()

    await telemechanicsDevice.load('substation', query => {
      query.select('id', 'name', 'objectTypeId', 'voltageClassesId')
      query.preload('object_type', query => query.select('id', 'shortName'))
      query.preload('voltage_class', query => query.select('id', 'name'))
    })
    await telemechanicsDevice.load('type_kp', query => query.select('id', 'name'))
    await telemechanicsDevice.load('head_controller', query => query.select('id', 'name'))

    return telemechanicsDevice
  }

  static async create(data: CreateTelemechanicsDevice): Promise<TelemechanicsDevice> {
    const telemechanicsDevice = await TelemechanicsDevice.create(data)

    return telemechanicsDevice
  }

  static async update(id: number, data: UpdateTelemechanicsDevice): Promise<TelemechanicsDevice> {
    const telemechanicsDevice = await TelemechanicsDevice.findOrFail(id)
    const updTelemechanicsDevice = await telemechanicsDevice.merge(data).save()

    return updTelemechanicsDevice
  }

  static async delete(id: number): Promise<void> {
    const telemechanicsDevice = await TelemechanicsDevice.findOrFail(id)

    await telemechanicsDevice.delete()

    return
  }
}
