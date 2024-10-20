import { transformDataSubstations } from '#helpers/transform_substations_data'
import Substation from '#models/substation'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import ExcelJS, { Cell, Row } from 'exceljs'
import { OrderByEnums } from '../enums/sort.js'
import { IQueryParams } from '../interfaces/query_params.js'

export default class SubstationService {
  static async getSubstations(
    req: Request,
    districtId?: number,
    withPreload: boolean = true
  ): Promise<{
    meta: any
    data: ModelObject[]
  }> {
    const { sort = 'name', order = 'asc', page, limit = 200, search, typeKp, headController, district, channelType, channelCategory } = req.qs() as IQueryParams
    const districtValue = districtId || district
    const substations = await Substation.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .if(districtValue, (query) => query.where('district_id', '=', districtValue!))
      .if(search, (query) => query.whereLike('nameSearch', `%${search}%`))
      .if(typeKp, (query) => query.where('type_kp_id', '=', typeKp))
      .if(headController, (query) => query.where('head_controller_id', '=', headController))
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
      .preload('type_kp')
      .preload('head_controller')
      .preload('channels', query => {
        query
          .preload('channel_category')
          .preload('channel_type')
          .preload('gsm_operator')
      })
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
        channels: {
          fields: {
            pick: ['id', 'ipAddress']
          },
          relations: {
            channel_category: {
              fields: {
                pick: ['name']
              }
            },
            channel_type: {
              fields: {
                pick: ['name']
              }
            },
            gsm_operator: {
              fields: {
                pick: ['name']
              }
            }
          }
        }
      },
    })

    return substationSerialize
  }
  static async getSubstation(params: Record<string, any>): Promise<ModelObject> {
    const substation = await Substation.findOrFail(params.id)

    await substation.load('district')
    await substation.load('voltage_class')
    await substation.load('type_kp')
    await substation.loadCount('works', (query) => query.count('*').as('numberCompletedWorks'))
    await substation.load('head_controller')
    await substation.load('files_photos_ps', (query) => query.preload('author').orderBy('createdAt', 'desc'))
    await substation.load('files_backups', (query) => query.preload('author').orderBy('createdAt', 'desc'))
    await substation.load('other_files', (query) => query.preload('author').orderBy('createdAt', 'desc'))
    await substation.load('channels', query => query.preload('channel_category').preload('channel_type').preload('channel_equipment').preload('gsm_operator'))

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
        channels: {
          fields: {
            omit: ['createdAt', 'updatedAt'],
          },
          relations: {
            channel_category: {
              fields: {
                pick: ['id', 'name'],
              }
            },
            channel_type: {
              fields: {
                pick: ['id', 'name'],
              }
            },
            channel_equipment: {
              fields: {
                pick: ['name']
              }
            },
            gsm_operator: {
              fields: {
                pick: ['name']
              }
            }
          }
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
      { header: 'Категория канала', key: 'channelCategory', width: 20 },
      { header: 'Тип канала', key: 'channelType', width: 20 },
      { header: 'IP адрес канала', key: 'channelIp', width: 19 },
      { header: 'GSM оператор', key: 'gsm', width: 17 },
    ]

    worksheet.getRow(1).eachCell((cell: Cell) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
      cell.font = { bold: true }
    })

    const applyStyles = (row: Row): void => row.eachCell(cell => cell.alignment = { vertical: 'middle', horizontal: 'center' })

    transformData.forEach(substation => {
      if (substation.channels && substation.channels.length > 0) {
        substation.channels?.forEach(channel => {
          const row = worksheet.addRow({
            district: substation.district,
            fullNameSubstation: substation.fullNameSubstation,
            rdu: substation.rdu,
            typeKp: substation.typeKp,
            headeController: substation.headController,
            channelCategory: channel.channelCategory,
            channelType: channel.channelType,
            channelIp: channel.ipAddress,
            gsm: channel.gsm
          })
          applyStyles(row)
        })
      } else {
        const row = worksheet.addRow({
          district: substation.district,
          fullNameSubstation: substation.fullNameSubstation,
          rdu: substation.rdu,
          typeKp: substation.typeKp,
          headeController: substation.headController,
          channelCategory: 'Нет',
          channelType: 'Нет',
          channelIp: 'Нет',
          gsm: 'Нет'
        })
        applyStyles(row)
      }
    })

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer
  }
}
