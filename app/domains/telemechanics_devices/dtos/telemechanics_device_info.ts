import TelemechanicsDevice from '#models/telemechanics_device'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class TelemechanicsDeviceInfoDto extends BaseModelDto {
  declare id: number
  declare substation: string
  declare type_kp: string
  declare head_controller: string
  declare controllerFirmwareVersion?: string | null
  declare note?: string | null

  constructor(telemechanicsDevice?: TelemechanicsDevice) {
    super()

    if (!telemechanicsDevice) return

    this.id = telemechanicsDevice.id
    this.substation = telemechanicsDevice.substation.fullNameSubstation
    this.type_kp = telemechanicsDevice.type_kp.name
    this.head_controller = telemechanicsDevice.head_controller.name
    this.controllerFirmwareVersion = telemechanicsDevice.controllerFirmwareVersion
    this.note = telemechanicsDevice.note
  }
}
