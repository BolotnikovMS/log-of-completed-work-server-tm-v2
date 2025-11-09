import GsmOperator from '#gsm_operator/models/gsm_operator'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class GsmOperatorDto extends BaseModelDto {
  declare id: number
  declare name: string

  constructor(gsmOperator?: GsmOperator) {
    super()

    if (!gsmOperator) return

    this.id = gsmOperator.id
    this.name = gsmOperator.name
  }
}
