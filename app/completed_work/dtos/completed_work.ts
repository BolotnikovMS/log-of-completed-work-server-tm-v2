import CompletedWork from '#completed_work/models/completed_work'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class CompletedWorkDto extends BaseModelDto {
  declare id: number
  declare substationId: number
  declare workProducerId: number
  declare typeWorkId: number
  declare description: string
  declare note: string | null
  declare dateCompletion: string
  declare inControl: boolean

  constructor(completedWork?: CompletedWork) {
    super()

    if (!completedWork) return

    this.id = completedWork.id
    this.substationId = completedWork.substationId
    this.workProducerId = completedWork.workProducerId
    this.typeWorkId = completedWork.typeWorkId
    this.description = completedWork.description
    this.note = completedWork.note
    this.dateCompletion = completedWork.dateCompletion.toString()
    this.inControl = completedWork.inControl
  }
}
