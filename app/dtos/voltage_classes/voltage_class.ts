import VoltageClass from '#models/voltage_class'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class VoltageClassDto extends BaseModelDto {
  declare id: number
  declare name: string

  constructor(voltageClass?: VoltageClass) {
    super()

    if (!voltageClass) return

    this.id = voltageClass.id
    this.name = voltageClass.name
  }
}
