import Defect from '#defect/models/defect'
import type { CreateClosesDefect, CreateDefect, QueryParamsDefect, UpdateDefect } from '#defect/types/defect_category'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class DefectService {
  static async getDefects(filters: QueryParamsDefect): Promise<ModelPaginatorContract<Defect>> {
    const { limit, page, substation, status, category } = filters
    const defects = await Defect.query()
      .if(substation, (query) => query.where('substationId', '=', substation!))
      .if(status, (query) => query.where('status', '=', status!))
      .if(category, (query) => query.where('category', '=', category!))
      .preload('substation', (query) => {
        query
          .select('voltageClassesId', 'objectTypeId', 'name')
          .preload('object_type', (query) => {
            query.select('shortName')
          })
          .preload('voltage_class', (query) => {
            query.select('name')
          })
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
    const updDefect = await defect.merge(data).save()

    return updDefect
  }

  static async delete(id: number): Promise<void> {
    const defect = await Defect.findOrFail(id)

    await defect.delete()

    return
  }
}
