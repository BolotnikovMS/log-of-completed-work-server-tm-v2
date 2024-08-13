import { ModelObject } from "@adonisjs/lucid/types/model"

export interface ITransformedData {
  [key: string]: string | null
  author: string
  work_producer: string
  dateCompletion: string
  substation: string
  description: string
  note: string | null
}

export const transformDataCompletedWork = (data: ModelObject[]): ITransformedData[] => {
  return data.map(work => ({
    author: work.author.shortName,
    work_producer: work.work_producer.shortName,
    dateCompletion: work.dateCompletion.split('-').reverse().join('.'),
    substation: work.substation && work.substation.fullNameSubstation,
    description: work.description,
    note: work.note,
  }))
}
