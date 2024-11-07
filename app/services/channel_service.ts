import ChannelDto from '#dtos/channel'
import { OrderByEnums } from '#enums/sort'
import { IParams } from '#interfaces/params'
import { IQueryParams } from '#interfaces/query_params'
import Channel from '#models/channel'
import { channelValidator } from '#validators/channel'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
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
    const transformData = channels.data.map(channel => new ChannelDto(channel as Channel))
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
        substation: channel.substation,
        channelCategory: channel.channel_category,
        channelType: channel.channel_type,
        channelEquipment: channel.channel_equipment ?? 'Не указан',
        gsmOperator: channel.gsm ?? 'Не указан',
        ipAddress: channel.ipAddress ?? 'Не указан',
        note: channel.note
      })
    })

    const noteCol = worksheet.getColumn('note')
    noteCol.eachCell(cell => cell.alignment = { wrapText: true })

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer
  }

  static async createChannel(req: Request, auth: Authenticator<Authenticators>): Promise<Channel> {
    const { user } = auth
    const validatedData = await req.validateUsing(channelValidator)
    const channel = await Channel.create({ userId: user?.id, ...validatedData })

    return channel
  }

  static async updateChannel(req: Request, params: IParams): Promise<Channel> {
    const channel = await Channel.findOrFail(params.id)
    const validatedData = await req.validateUsing(channelValidator)
    const updChannel = await channel.merge(validatedData).save()

    return updChannel
  }

  static async deleteChannel(params: IParams): Promise<void> {
    const channel = await Channel.findOrFail(params.id)

    await channel.delete()
  }
}
