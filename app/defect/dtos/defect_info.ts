import type Defect from '#defect/models/defect'
import { BaseModelDto } from '@adocasts.com/dto/base'
import type { DateTime } from 'luxon'

export class DefectInfoDto extends BaseModelDto {
  declare id: number
  declare status: string
  declare description: string
  declare category: string
  declare resolution: string | null
  declare resolvedAt: string | null
  declare createdAt: DateTime
  declare author: string
  declare authorResolved: string | null
  declare substation: string

  constructor(defect?: Defect) {
    super()

    if (!defect) return

    this.id = defect.id
    this.status = defect.status
    this.description = defect.description
    this.category = defect.category
    this.resolution = defect.resolution
    this.resolvedAt = defect.resolvedAt
    this.createdAt = defect.createdAt
    this.author = defect.author.shortName
    this.authorResolved = defect.authorResolved?.shortName
    this.substation = defect.substation.fullNameSubstation
  }
}
