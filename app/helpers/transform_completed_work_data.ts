import { ModelObject } from "@adonisjs/lucid/types/model"

export interface ITransformedData {
  [key: string]: string | null
  author: string
  workProducer: string
  typeWork: string,
  dateCompletion: string
  substation: string
  description: string
  note: string | null
}

export const transformDataCompletedWork = (data: ModelObject[]): ITransformedData[] => {
  return data.map(work => ({
    author: work.author.shortName,
    workProducer: work.work_producer.shortName,
    typeWork: work.type_work.name,
    dateCompletion: work.dateCompletion.split('-').reverse().join('.'),
    substation: work.substation && work.substation.fullNameSubstation,
    description: work.description,
    note: work.note,
  }))
}
