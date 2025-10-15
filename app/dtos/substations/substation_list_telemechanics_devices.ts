import TelemechanicsDevice from '#models/telemechanics_device'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class SubstationListTelemechanicsDevicesDto extends BaseModelDto {
  declare type_kp: string

  constructor(telemechanicsDevice?: TelemechanicsDevice) {
    super()

    if (!telemechanicsDevice) return

    this.type_kp = telemechanicsDevice.type_kp.name
  }
}
