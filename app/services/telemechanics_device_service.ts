import {
  ICreateTelemechanicsDevice,
  ITelemechanicsDevice,
} from '#domains/telemechanics_devices/interfaces/index'
import { IQueryParams2 } from '#interfaces/query_params'
import TelemechanicsDevice from '#models/telemechanics_device'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class TelemechanicsDeviceService {
  static async findAll(
    filters: IQueryParams2
  ): Promise<ModelPaginatorContract<TelemechanicsDevice>> {
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

  static async create(data: ICreateTelemechanicsDevice): Promise<TelemechanicsDevice> {
    const telemechanicsDevice = await TelemechanicsDevice.create(data)

    return telemechanicsDevice
  }

  static async update(id: number, data: ITelemechanicsDevice): Promise<TelemechanicsDevice> {
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
