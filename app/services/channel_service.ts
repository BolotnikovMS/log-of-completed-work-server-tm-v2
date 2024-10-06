import { OrderByEnums } from '#enums/sort'
import { transformDataChannels } from '#helpers/transform_channel_data'
import { IQueryParams } from '#interfaces/query_params'
import Channel from '#models/channel'
import { Request } from '@adonisjs/core/http'
import ExcelJS from 'exceljs'

export default class ChannelService {
  static async getChannels(req: Request) {
    const { sort, order, page, limit, substation, channelType } = req.qs() as IQueryParams
    const channels = await Channel.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .if(substation, (query) => query.where('substationId', '=', substation))
      .if(channelType, (query) => query.where('channelTypeId', '=', channelType))
      .preload('substation', query => query.preload('voltage_class'))
      .preload('channel_category')
      .preload('channel_type')
      .paginate(page, limit)

    const channelsSerialize = channels.serialize({
      fields: {
        omit: ['createdAt', 'updatedAt']
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
        substation: {
          fields: {
            pick: ['id', 'fullNameSubstation'],
          },
          relations: {
            voltage_class: {
              fields: {
                pick: ['name']
              }
            }
          }
        }
      }
    })

    return channelsSerialize
  }
  static async createExcelFile(req: Request): Promise<ExcelJS.Buffer> {
    const channels = await this.getChannels(req)
    const transformData = transformDataChannels(channels.data)
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    worksheet.columns = [
      { header: 'Объект', key: 'substation', width: 26 },
      { header: 'Категория канала', key: 'channelCategory', width: 20 },
      { header: 'Тип канала', key: 'channelType', width: 20 },
      { header: 'IP адрес', key: 'ipAddress', width: 20 },
      { header: 'Примечание', key: 'note', width: 50 },
    ]

    transformData.forEach((channel, i) => {
      const row = worksheet.getRow(i + 2)

      Object.keys(channel).forEach((key, iCel) => {
        row.getCell(iCel + 1).value = channel[key]
      })
    })

    const noteCol = worksheet.getColumn('note')
    noteCol.eachCell(cell => cell.alignment = { wrapText: true })

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer
  }
}
