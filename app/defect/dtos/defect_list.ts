import type Defect from '#defect/models/defect'
import { BaseModelDto } from '@adocasts.com/dto/base'
import type { DateTime } from 'luxon'

export class DefectListDto extends BaseModelDto {
  declare id: number
  declare status: string
  declare title: string
  declare category: string
  declare createdAt: DateTime

  constructor(defect?: Defect) {
    super()

    if (!defect) return

    this.id = defect.id
    this.status = defect.status
    this.title = defect.title
    this.category = defect.category
    this.createdAt = defect.createdAt
  }
}
