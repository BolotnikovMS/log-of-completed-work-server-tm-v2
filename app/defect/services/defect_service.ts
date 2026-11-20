import Defect from '#defect/models/defect'
import type { CreateClosesDefect, CreateDefect, QueryParamsDefect, UpdateDefect } from '#defect/types/defect_category'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'
import { DateTime } from 'luxon'

export default class DefectService {
  static #parseUserDate(dateString: string): DateTime {
    let date = DateTime.fromISO(dateString, { zone: 'utc' })

    if (!date.isValid) {
      date = DateTime.fromFormat(dateString, 'dd.MM.yyyy HH:mm:ss', { zone: 'utc' })
    }

    if (!date.isValid) {
      date = DateTime.fromFormat(dateString, 'dd.MM.yyyy HH:mm:ss', { zone: 'utc' })
    }

    if (!date.isValid) {
      throw new Error(`Некорректный формат даты: ${dateString}`)
    }

    if (!dateString.includes(':')) {
      date = date.startOf('day')
    }

    return date.setZone('utc', { keepLocalTime: false })
  }

  static async getDefects(filters: QueryParamsDefect): Promise<ModelPaginatorContract<Defect>> {
    const { limit, page, substation, status, category } = filters
    const defects = await Defect.query()
      .orderBy('status', 'desc')
      .if(substation, (query) => query.where('substationId', '=', substation!))
      .if(status, (query) => query.where('status', '=', status!))
      .if(category, (query) => query.where('category', '=', category!))
      .preload('substation', (query) => {
        query
          .select('voltageClassesId', 'objectTypeId', 'name', 'createdAt')
          .preload('object_type', (query) => {
            query.select('shortName')
          })
          .preload('voltage_class', (query) => {
            query.select('name')
          })
      })
      .preload('author', (query) => {
        query.select('surname', 'name', 'patronymic')
      })
      .preload('authorResolved', (query) => {
        query.select('surname', 'name', 'patronymic')
      })
      .paginate(page!, limit)

    return defects
  }

  static async findById(id: number): Promise<Defect> {
    const defect = await Defect.findOrFail(id)

    return defect
  }

  static async findInfoById(id: number): Promise<Defect> {
    const defectInfo = await Defect.findOrFail(id)

    await defectInfo.load('author', (query) => {
      query.select('id', 'name', 'surname', 'patronymic')
    })
    await defectInfo.load('authorResolved', (query) => {
      query.select('id', 'name', 'surname', 'patronymic')
    })
    await defectInfo.load('substation', (query) => {
      query
        .select('voltageClassesId', 'name', 'objectTypeId')
        .preload('voltage_class', (query) => {
          query.select('name')
        })
        .preload('object_type', (query) => {
          query.select('shortName')
        })
    })

    return defectInfo
  }

  static async createDefect(data: CreateDefect): Promise<Defect> {
    const title = data.description.slice(0, 30).trim()
    const defect = await Defect.create({ ...data, title: title })

    return defect
  }

  static async updateDefect(id: number, data: UpdateDefect): Promise<Defect> {
    const defect = await Defect.findOrFail(id)
    const title = data.description?.slice(0, 30).trim()
    const updDefect = await defect.merge({ ...data, title: title }).save()

    return updDefect
  }

  static async createCloses(id: number, data: CreateClosesDefect): Promise<Defect> {
    const defect = await Defect.findOrFail(id)
    let resolvedAt: DateTime | null = null

    if (data.resolvedAt) {
      resolvedAt = this.#parseUserDate(data.resolvedAt)
    }

    const updDefect = await defect.merge({ ...data, resolvedAt: resolvedAt }).save()

    return updDefect
  }

  static async delete(id: number): Promise<void> {
    const defect = await Defect.findOrFail(id)

    await defect.delete()

    return
  }
}
