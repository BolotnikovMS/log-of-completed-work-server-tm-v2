import CompletedWork from '#models/completed_work'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class CompletedWorkListDto extends BaseModelDto {
  declare id: number
  declare userId: number
  declare substationId: number
  declare description: string
  declare dateCompletion: string
  declare inControl: boolean
  declare work_producer: string
  declare type_work: string
  declare substation: string

  constructor(completedWork?: CompletedWork) {
    super()

    if (!completedWork) return

    this.id = completedWork.id
    this.userId = completedWork.userId
    this.substationId = completedWork.substationId
    this.description = completedWork.description
    this.dateCompletion = completedWork.dateCompletion.toString()
    this.inControl = completedWork.inControl
    this.work_producer = completedWork.work_producer.shortName
    this.type_work = completedWork.type_work.name
    this.substation = completedWork.substation.fullNameSubstation
  }
}
