import type Defect from "#defect/models/defect"
import { BaseModelDto } from "@adocasts.com/dto/base"

export default class DefectReportDto extends BaseModelDto {
  declare id: number
  declare substation: string
  declare status: string
  declare category: string
  declare description: string
  declare author: string
  declare resolvedAt: string | null
  declare resolution: string | null
  declare authorResolved: string | null

  constructor(defect?: Defect) {
    super()

    if (!defect) return

    this.id = defect.id
    this.substation = defect.substation.fullNameSubstation
    this.status = defect.status
    this.category = defect.category
    this.description = defect.description
    this.author = defect.author.shortName
    this.resolvedAt = defect?.resolvedAt
    this.resolution = defect?.resolution
    this.authorResolved = defect?.authorResolved?.shortName
  }
}
