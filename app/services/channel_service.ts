import { OrderByEnums } from '#enums/sort'
import { transformDataChannels } from '#helpers/transform_channel_data'
import { IQueryParams } from '#interfaces/query_params'
import Channel from '#models/channel'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'
import ExcelJS, { Cell } from 'exceljs'

export default class ChannelService {
  static async getChannels(req: Request): Promise<{ meta: any, data: ModelObject[] }> {
    const { sort, order, page, limit, substation, channelType, channelCategory } = req.qs() as IQueryParams
    const channels = await Channel.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .if(substation, (query) => query.where('substationId', '=', substation))
      .if(channelType, (query) => query.where('channelTypeId', '=', channelType))
      .if(channelCategory, (query) => query.where('channelCategoryId', '=', channelCategory))
      .preload('substation', query => query.preload('voltage_class'))
      .preload('channel_category')
      .preload('channel_type')
      .preload('channel_equipment')
      .preload('gsm_operator')
      .paginate(page, limit)

    return channels.serialize()
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
      { header: 'Тип оборудования', key: 'channelEquipment', width: 20 },
      { header: 'GSM оператор', key: 'gsmOperator', width: 20 },
      { header: 'IP адрес', key: 'ipAddress', width: 20 },
      { header: 'Примечание', key: 'note', width: 50 },
    ]

    worksheet.getRow(1).eachCell((cell: Cell) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
      cell.font = { bold: true }
    })

    transformData.forEach(channel => {
      worksheet.addRow({
        substation: channel.fullNameSubstation,
        channelCategory: channel.channelCategory,
        channelType: channel.channelType,
        channelEquipment: channel.channelEquipment,
        gsmOperator: channel.gsmOperator,
        ipAddress: channel.ipAddress,
        note: channel.note
      })
    })

    const noteCol = worksheet.getColumn('note')
    noteCol.eachCell(cell => cell.alignment = { wrapText: true })

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer
  }
}
