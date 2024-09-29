import { transformDataSubstations } from '#helpers/transform_substations_data'
import Substation from '#models/substation'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import ExcelJS from 'exceljs'
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
    const { sort = 'name', order = 'asc', page, limit = 200, search, typeKp, headController, mainChannel, backupChannel, district } = req.qs() as IQueryParams
    const districtValue = districtId || district
    const substations = await Substation.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .if(districtValue, (query) => query.where('district_id', '=', districtValue!))
      .if(search, (query) => query.whereLike('nameSearch', `%${search}%`))
      .if(typeKp, (query) => query.where('type_kp_id', '=', typeKp))
      .if(headController, (query) => query.where('head_controller_id', '=', headController))
      .if(mainChannel, (query) => query.where('main_channel_id', '=', mainChannel))
      .if(backupChannel, (query) => query.where('backup_channel_id', '=', backupChannel))
      .preload('voltage_class')
      .preload('district')
      .preload('type_kp')
      .preload('head_controller')
      .preload('main_channel')
      .preload('backup_channel')
      .preload('additional_channel')
      .preload('gsm')
      .preload('channels', query => query.preload('channel_category').preload('channel_type'))
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
        district: {
          fields: {
            pick: ['name']
          }
        },
        type_kp: {
          fields: {
            pick: ['name']
          }
        },
        head_controller: {
          fields: {
            pick: ['name']
          }
        },
        main_channel: {
          fields: {
            pick: ['name']
          }
        },
        backup_channel: {
          fields: {
            pick: ['name']
          }
        },
        additional_channel: {
          fields: {
            pick: ['name']
          }
        },
        gsm: {
          fields: {
            pick: ['name']
          }
        }
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
    await substation.loadCount('works', (query) => query.count('*').as('numberCompletedWorks'))
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

    return { ...substationSerialize, numberCompletedWorks: substation.$extras.numberCompletedWorks }
  }

  static async createExcelFile(req: Request): Promise<ExcelJS.Buffer> {
    const substations = await this.getSubstations(req)
    const transformData = transformDataSubstations(substations.data)
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    worksheet.columns = [
      { header: 'Район/ГП/УС', key: 'district', width: 20 },
      { header: 'Подстанция', key: 'fullNameSubstation', width: 25 },
      { header: 'РДУ', key: 'rdu', width: 12 },
      { header: 'Тип КП', key: 'typeKp', width: 17 },
      { header: 'Головной контроллер', key: 'headeController', width: 20 },
      { header: 'Основно канал', key: 'mainChannel', width: 20 },
      { header: 'Резервный канал', key: 'backupChannel', width: 20 },
      { header: 'Дополнительный канал', key: 'additionalChannel', width: 20 },
      { header: 'IP основного канала', key: 'mainChannelIp', width: 19 },
      { header: 'IP резервного канала', key: 'backupChannelIp', width: 19 },
      { header: 'GSM', key: 'gsm', width: 17 },
    ]
    transformData.forEach((work, i) => {
      const row = worksheet.getRow(i + 2)

      Object.keys(work).forEach((key, iCel) => {
        row.getCell(iCel + 1).value = work[key]
      })
    })

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer
  }
}
