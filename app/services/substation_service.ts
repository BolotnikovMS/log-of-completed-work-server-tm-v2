import Substation from '#models/substation'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export default class SubstationService {
  static async getSubstations(
    req: Request,
    districtId?: number
  ): Promise<{
    meta: any
    data: ModelObject[]
  }> {
    const { sort, order, page, limit = 200, search } = req.qs() as IQueryParams
    const substations = await Substation.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .if(districtId, (query) => query.where('district_id', '=', districtId!))
      .if(search, (query) => query.whereLike('nameSearch', `%${search}%`))
      .preload('voltage_class')
      .paginate(page, limit)

    const substationSerialize = substations.serialize({
      fields: {
        omit: ['createdAt', 'updatedAt'],
      },
      relations: {
        voltage_class: {
          fields: {
            pick: ['name'],
          },
        },
      },
    })

    return substationSerialize
  }
  static async getSubstation(params: Record<string, any>): Promise<Substation> {
    const substation = await Substation.findOrFail(params.id)

    if (substation.additionalChannelId) {
      await substation.load('additional_channel')
    }

    if (substation.backupChannelId) {
      await substation.load('backup_channel')
    }

    if (substation.gsmId) {
      await substation.load('gsm')
    }

    await substation.load('district')
    await substation.load('voltage_class')
    await substation.load('type_kp')
    await substation.load('works')
    await substation.load('head_controller')
    await substation.load('main_channel')
    await substation.load('files_photos_ps')
    await substation.load('files_backups')

    // console.log(substation.serialize())

    return substation
  }
}
