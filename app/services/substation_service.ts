import Substation from '#models/substation'
import { Request } from '@adonisjs/core/http'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'
export default class SubstationService {
  static async getSubstations(req: Request, districtId?: number): Promise<Substation[]> {
    const { active, sort, order, page, limit } = req.qs() as IQueryParams
    const substations = await Substation.query()
      // .if(active, (query) => query.where('active', '=', ActiveEnum[active]))
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .if(districtId, (query) => query.where('district_id', '=', districtId!))
      .preload('voltage_class')
      .paginate(page, limit)

    return substations
  }
  static async getSubstation(params: Record<string, any>): Promise<Substation> {
    const substation = await Substation.findOrFail(params.id)

    await substation.load('district')
    await substation.load('voltage_class')
    await substation.load('type_kp')
    await substation.load('works')
    await substation.load('head_controller')
    await substation.load('main_channel')
    await substation.load('backup_channel')
    await substation.load('additional_channel')
    await substation.load('gsm')

    return substation
  }
}
