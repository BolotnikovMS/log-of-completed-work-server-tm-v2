import HeadController from '#head_controller/models/head_controller'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class HeadControllerDto extends BaseModelDto {
  declare id: number
  declare name: string
  declare actualFirmwareVersion: string | null

  constructor(headController?: HeadController) {
    super()

    if (!headController) return

    this.id = headController.id
    this.name = headController.name
    this.actualFirmwareVersion = headController.actualFirmwareVersion || null
  }
}
