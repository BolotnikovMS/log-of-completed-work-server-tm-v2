import Substation from '#substation/models/substation'
import type { CreateSubstation, KeyDefectSubstation, QueryParamsSubstation, UpdateNoteSubstation, UpdateSubstation } from '#substation/types/index'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class SubstationService {
  static async getSubstations(
    filters?: QueryParamsSubstation,
    districtId?: number,
  ): Promise<ModelPaginatorContract<Substation>> {
    // const { sort = 'name', order = 'asc', page, limit, search, district, channelType, channelCategory, objectType, typeKp, headController } = filters
    const districtValue = districtId || filters?.district
    const substations = await Substation.query()
      .if(filters?.sort && filters?.order, (query) => query.orderBy(filters?.sort!, filters?.order!))
      .if(districtValue, (query) => query.where('district_id', '=', districtValue!))
      .if(filters?.search, (query) => query.whereLike('nameSearch', `%${filters?.search}%`))
      .if(filters?.objectType, (query) => query.where('object_type_id', '=', filters?.objectType!))
      .if(filters?.channelType || filters?.channelCategory, query => {
        query.whereHas('channels', query => {
          if (filters?.channelType) {
            query.where('channelTypeId', '=', filters?.channelType)
          }
          if (filters?.channelCategory) {
            query.where('channelCategoryId', '=', filters?.channelCategory)
          }
        })
      })
      .if(filters?.typeKp || filters?.headController, query => {
        query.whereHas('telemechanics_device', query => {
          if (filters?.typeKp) {
            query.where('typeKpId', '=', filters?.typeKp)
          }
          if (filters?.headController) {
            query.where('headControllerId', '=', filters?.headController)
          }
        })
      })
      .preload('voltage_class', query => query.select('id', 'name'))
      .preload('district', query => query.select('id', 'name'))
      .preload('object_type', query => query.select('id', 'shortName'))
      .preload('channels', query => {
        query
          .select('id', 'channelCategoryId', 'channelTypeId', 'channelEquipmentId', 'gsmId', 'ipAddress')
          .preload('channel_category', query => query.select('id', 'name'))
          .preload('channel_type', query => query.select('id', 'name'))
          .preload('gsm_operator', query => query.select('id', 'name'))
      })
      .preload('telemechanics_device', query => {
        query
          .if(filters?.typeKp || filters?.headController, query => {
            if (filters?.typeKp) {
              query.where('typeKpId', '=', filters?.typeKp)
            }
            if (filters?.headController) {
              query.where('headControllerId', '=', filters?.headController)
            }
          })
          .select('id', 'typeKpId', 'headControllerId', 'controllerFirmwareVersion', 'note')
          .preload('type_kp', query => query.select('id', 'name'))
          .preload('head_controller', query => query.select('id', 'name'))
      })
      .paginate(filters?.page!, filters?.limit)

    return substations
  }

  static async findById(id: number): Promise<Substation> {
    const substation = await Substation.findOrFail(id)

    return substation
  }

  static async getInfo(id: number): Promise<{ substation: Substation, numberCompletedWorks: number }> {
    const substation = await Substation.findOrFail(id)

    await substation.load('district')
    await substation.load('voltage_class')
    await substation.loadCount('works', (query) => query.count('*').as('numberCompletedWorks'))
    await substation.load('files_photos_ps', (query) => query.preload('author').orderBy('createdAt', 'asc'))
    await substation.load('files_backups', (query) => query.preload('author').orderBy('createdAt', 'desc'))
    await substation.load('other_files', (query) => query.preload('author').orderBy('createdAt', 'desc'))
    await substation.load('channels', (query) => query.preload('channel_category').preload('channel_type').preload('channel_equipment').preload('gsm_operator'))
    await substation.load('object_type')
    await substation.load('telemechanics_device', (query) => {
      query.preload('head_controller')
      query.preload('type_kp')
    })

    return { substation, numberCompletedWorks: substation.$extras.numberCompletedWorks }
  }

  static async create(data: CreateSubstation): Promise<Substation> {
    const substation = await Substation.create(data)

    return substation
  }

  static async update(id: number, data: UpdateSubstation): Promise<Substation> {
    const substation = await Substation.findOrFail(id)
    const updSubstation = await substation.merge(data).save()

    return updSubstation
  }

  static async updateNote(id: number, data: UpdateNoteSubstation): Promise<Substation> {
    const substation = await Substation.findOrFail(id)
    const updSubstation = await substation.merge(data).save()

    return updSubstation
  }

  static async delete(id: number): Promise<void> {
    const substation = await Substation.findOrFail(id)

    await substation.related('works').query().delete()
    await substation.delete()

    return
  }

  static async updateKeyDefect(id: number, data: KeyDefectSubstation): Promise<Substation> {
    const substation = await Substation.findOrFail(id)
    const updSubstation = await substation.merge(data).save()

    return updSubstation
  }
}
