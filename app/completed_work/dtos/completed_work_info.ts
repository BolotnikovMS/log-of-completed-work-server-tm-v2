import CompletedWork from '#completed_work/models/completed_work'
import { BaseModelDto } from '@adocasts.com/dto/base'

export default class CompletedWorkInfoDto extends BaseModelDto {
  declare id: number
  declare substation: string
  declare dateCompletion: string
  declare type_work: string
  declare work_producer: string
  declare author: string
  declare description: string
  declare note: string | null

  constructor(completedWork?: CompletedWork) {
    super()

    if (!completedWork) return

    this.id = completedWork.id
    this.substation = completedWork.substation.fullNameSubstation
    this.dateCompletion = completedWork.dateCompletion.toString()
    this.type_work = completedWork.type_work.name
    this.work_producer = completedWork.work_producer.shortName
    this.author = completedWork.author.shortName
    this.description = completedWork.description
    this.note = completedWork.note
  }
}
