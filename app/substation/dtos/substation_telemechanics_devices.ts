import TelemechanicsDevice from '#telemechanic_device/models/telemechanics_device'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationTelemechanicsDevicesDto extends BaseModelDto {
  declare id: number
  declare type_kp: string
  declare head_controller: string

  constructor(telemechanicsDevice?: TelemechanicsDevice) {
    super()

    if (!telemechanicsDevice) return

    this.id = telemechanicsDevice.id
    this.type_kp = telemechanicsDevice.type_kp.name
    this.head_controller = telemechanicsDevice.head_controller.name
  }
}
