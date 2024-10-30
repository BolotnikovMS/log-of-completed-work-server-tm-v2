import CompletedWork from '#models/completed_work'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class CompletedWorkDto extends BaseModelDto {
  declare id: number
  declare userId: number
  declare substationId: number
  declare workProducerId: number
  declare typeWorkId: number
  declare description: string
  declare note: string | null
  declare dateCompletion: string
  declare work_producer: string | null
  declare author: string | null
  declare type_work: string | null
  declare substation: string | null

  constructor(completedWork?: CompletedWork) {
    super()

    if (!completedWork) return

    this.id = completedWork.id
    this.userId = completedWork.userId
    this.substationId = completedWork.substationId
    this.workProducerId = completedWork.workProducerId
    this.typeWorkId = completedWork.typeWorkId
    this.description = completedWork.description
    this.note = completedWork.note
    this.dateCompletion = completedWork.dateCompletion.toString()!
    this.work_producer = completedWork.work_producer?.shortName
    this.author = completedWork.author?.shortName
    this.type_work = completedWork.type_work?.name
    this.substation = completedWork.substation?.fullNameSubstation
  }
}
