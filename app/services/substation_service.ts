import { transliterate } from '#helpers/transliterate'
import { IParams } from '#interfaces/params'
import Substation from '#models/substation'
import { substationValidator } from '#validators/substation'
import { substationKeyDefectValidator } from '#validators/substation_key_defect'
import { substationNoteValidator } from '#validators/substation_note'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export default class SubstationService {
  static async getSubstations(
    req: Request,
    districtId?: number,
  ): Promise<{
    meta: any,
    data: ModelObject[]
  }> {
    const { sort = 'name', order = 'asc', page, limit = -1, search, district, channelType, channelCategory, objectType } = req.qs() as IQueryParams
    const districtValue = districtId || district
    const substations = await Substation.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .if(districtValue, (query) => query.where('district_id', '=', districtValue!))
      .if(search, (query) => query.whereLike('nameSearch', `%${search}%`))
      .if(objectType, (query) => query.where('object_type_id', '=', objectType))
      .if(channelType || channelCategory, query => {
        query.whereHas('channels', query => {
          query
            .where('channelTypeId', '=', channelType)
            .orWhere('channelCategoryId', '=', channelCategory)
        })
      })
      .if(channelType && channelCategory, query => {
        query.whereHas('channels', query => {
          query
            .where('channelTypeId', '=', channelType)
            .where('channelCategoryId', '=', channelCategory)
        })
      })
      .preload('voltage_class')
      .preload('district')
      .preload('object_type')
      .preload('channels', query => {
        query
          .preload('channel_category')
          .preload('channel_type')
          .preload('gsm_operator')
      })
      .paginate(page, limit)

    return substations.serialize()
  }

  static async getSubstationById(params: IParams): Promise<Substation> {
    const substation = await Substation.findOrFail(params.id)

    return substation
  }

  static async getSubstationInfo(params: Record<string, any>): Promise<{ substation: Substation, numberCompletedWorks: number }> {
    const substation = await Substation.findOrFail(params.id)

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

  static async createSubstation(req: Request, auth: Authenticator<Authenticators>): Promise<Substation> {
    const { user } = auth
    const validatedData = await req.validateUsing(substationValidator)
    const substation = await Substation.create({
      userId: user?.id,
      nameSearch: transliterate(validatedData.name),
      ...validatedData,
    })

    return substation
  }

  static async update(req: Request, params: IParams): Promise<Substation> {
    const substation = await Substation.findOrFail(params.id)
    const validatedData = await req.validateUsing(substationValidator)
    const updSubstation = await substation
      .merge({ nameSearch: transliterate(validatedData.name), ...validatedData })
      .save()

    return updSubstation
  }

  static async updateNote(req: Request, params: IParams): Promise<Substation> {
    const substation = await Substation.findOrFail(params.id)
    const validatedData = await req.validateUsing(substationNoteValidator)
    const updSubstation = await substation.merge(validatedData).save()

    return updSubstation
  }

  static async deleteSubstation(params: IParams): Promise<void> {
    const substation = await Substation.findOrFail(params.id)

    await substation.related('works').query().delete()
    await substation.delete()
  }

  static async updateKeyDefectSubstation(req: Request, params: IParams): Promise<Substation> {
    const substation = await Substation.findOrFail(params.id)
    const validatedData = await req.validateUsing(substationKeyDefectValidator)
    const updSubstation = await substation.merge(validatedData).save()

    return updSubstation
  }
}
