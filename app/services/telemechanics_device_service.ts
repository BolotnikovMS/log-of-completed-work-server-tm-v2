import { ICreateTelemechanicsDevice, ITelemechanicsDevice } from "#domains/telemechanics_devices/interfaces/index"
import TelemechanicsDevice from "#models/telemechanics_device"

export class TelemechanicsDeviceService {
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
