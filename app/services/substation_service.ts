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
    const { sort = 'name', order = 'asc', page, limit = 200, search, typeKp, headController } = req.qs() as IQueryParams
    const substations = await Substation.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .if(districtId, (query) => query.where('district_id', '=', districtId!))
      .if(search, (query) => query.whereLike('nameSearch', `%${search}%`))
      .if(typeKp, (query) => query.where('type_kp_id', '=', typeKp))
      .if(headController, (query) => query.where('head_controller_id', '=', headController))
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
  static async getSubstation(params: Record<string, any>): Promise<ModelObject> {
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
    await substation.load('files_photos_ps', (query) => query.preload('author'))
    await substation.load('files_backups', (query) => query.preload('author'))
    await substation.load('other_files', (query) => query.preload('author'))

    // console.log(substation.serialize())
    const substationSerialize = substation.serialize({
      fields: {
        omit: ['createdAt', 'updatedAt'],
      },
      relations: {
        district: {
          fields: {
            pick: ['id', 'name', 'shortName'],
          },
        },
        voltage_class: {
          fields: {
            pick: ['id', 'name'],
          },
        },
        type_kp: {
          fields: {
            pick: ['id', 'name'],
          },
        },
        head_controller: {
          fields: {
            pick: ['id', 'name'],
          },
        },
        main_channel: {
          fields: {
            pick: ['id', 'name'],
          },
        },
        backup_channel: {
          fields: {
            pick: ['id', 'name'],
          },
        },
        additional_channel: {
          fields: {
            pick: ['id', 'name'],
          },
        },
        gsm: {
          fields: {
            pick: ['id', 'name'],
          },
        },
        files_backups: {
          fields: {
            pick: ['id', 'clientName', 'filePath', 'size', 'typeFile', 'createdAt'],
          },
          relations: {
            author: {
              fields: {
                pick: ['id', 'shortName'],
              },
            },
          },
        },
        files_photos_ps: {
          fields: {
            pick: ['id', 'clientName', 'filePath', 'size', 'typeFile', 'createdAt'],
          },
          relations: {
            author: {
              fields: {
                pick: ['id', 'shortName'],
              },
            },
          },
        },
        other_files: {
          fields: {
            pick: ['id', 'clientName', 'filePath', 'size', 'typeFile', 'createdAt'],
          },
          relations: {
            author: {
              fields: {
                pick: ['id', 'shortName'],
              },
            },
          },
        },
      },
    })

    return substationSerialize
  }
}
