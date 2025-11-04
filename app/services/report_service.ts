import { ChannelDto } from '#dtos/channels/index'
import CompletedWorkInfoDto from '#dtos/completed_works/completed_work_info'
import { SubstationsReportDto, SubstationsTelemechanicsDevicesReportDto } from '#dtos/reports/index'
import Channel from '#models/channel'
import CompletedWork from '#models/completed_work'
import Substation from '#models/substation'
import ChannelService from '#services/channel_service'
import CompletedWorkService from '#services/completed_wokr_service'
import SubstationService from '#services/substation_service'
import { Request } from '@adonisjs/core/http'
import ExcelJS, { Cell } from 'exceljs'

export default class ReportService {
  static #applyStylesRowTitle(worksheet: ExcelJS.Worksheet): void {
    worksheet.getRow(1).eachCell((cell: Cell) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
      cell.font = { bold: true, size: 15 }
      cell.border = { top: { style: 'medium' }, bottom: { style: 'medium' }, left: { style: 'medium' }, right: { style: 'medium' } }
    })
  }

  static #applyStyles(worksheet: ExcelJS.Worksheet, columnNames?: string[]): void {
    worksheet.eachRow((row, rowNum) => {
      if (rowNum > 1) {
        row.eachCell({ includeEmpty: true }, cell => {
          cell.alignment = { vertical: 'middle', horizontal: 'center' }
          cell.font = { size: 14 }
          cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } }
        })
      }
    })

    if (columnNames && columnNames.length) {
      columnNames.forEach(colName => {
        const column = worksheet.getColumn(colName)

        column.eachCell({ includeEmpty: false }, (cell, cellNum) => {
          if (cellNum > 1) {
            cell.alignment = { vertical: 'middle', wrapText: true }
          }
        })
      })
    }
  }

  static async createExcelCompletedWorks(req: Request): Promise<ExcelJS.Buffer> {
    const works = await CompletedWorkService.getCompletedWorks(req)
    const transformData = works.data.map(work => new CompletedWorkInfoDto(work as CompletedWork))
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    worksheet.columns = [
      { header: 'Автор записи', key: 'author', width: 18 },
      { header: 'Выполнил', key: 'workProducer', width: 18 },
      { header: 'Категория работ', key: 'typeWork', width: 30 },
      { header: 'Дата выполнения', key: 'dateCompletion', width: 21 },
      { header: 'ПС', key: 'substation', width: 26 },
      { header: 'Описание', key: 'description', width: 50 },
      { header: 'Примечания', key: 'note', width: 50 },
    ]

    this.#applyStylesRowTitle(worksheet)

    transformData.forEach(work => {
      worksheet.addRow({
        author: work.author,
        workProducer: work.work_producer,
        typeWork: work.type_work,
        dateCompletion: work.dateCompletion.split('-').reverse().join('.'),
        substation: work.substation,
        description: work.description,
        note: work.note,
      })
    })

    this.#applyStyles(worksheet, ['description', 'note'])

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer
  }

  static async createExcelSubstations(req: Request): Promise<ExcelJS.Buffer> {
    const substations = await SubstationService.getSubstations(req)
    const transformData = substations.data.map(substation => new SubstationsReportDto(substation as Substation))
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    worksheet.columns = [
      { header: 'Район/ГП/УС', key: 'district', width: 20 },
      { header: 'Объект', key: 'fullNameSubstation', width: 27 },
      { header: 'Тип объекта', key: 'objectType', width: 16 },
      { header: 'РДУ', key: 'rdu', width: 12 },
      { header: 'Тип КП', key: 'typeKp', width: 17 },
      { header: 'Головной контроллер', key: 'headeController', width: 26 },
      { header: 'Категория канала', key: 'channelCategory', width: 30 },
      { header: 'Тип канала', key: 'channelType', width: 20 },
      { header: 'IP адрес канала', key: 'channelIp', width: 19 },
      { header: 'GSM оператор', key: 'gsm', width: 18 },
      { header: 'Примечание', key: 'note', width: 50 },
    ]

    this.#applyStylesRowTitle(worksheet)

    transformData.forEach(substation => {
      if (substation.channels && substation.channels.length > 0) {
        substation.channels?.forEach(channel => {
          worksheet.addRow({
            district: substation.district,
            fullNameSubstation: substation.fullNameSubstation,
            objectType: substation.object_type ?? 'Не указан',
            rdu: substation.rdu,
            typeKp: substation.type_kp ?? 'Не указан',
            headeController: substation.head_controller ?? 'Не указан',
            channelCategory: channel.channel_category ?? 'Не указан',
            channelType: channel.channel_type ?? 'Не указан',
            channelIp: channel.ipAddress ?? 'Не указан',
            gsm: channel.gsm_operator ?? 'Не указан',
            note: substation.note
          })
        })
      } else {
        worksheet.addRow({
          district: substation.district,
          fullNameSubstation: substation.fullNameSubstation,
          objectType: substation.object_type ?? 'Не указан',
          rdu: substation.rdu,
          typeKp: substation.type_kp ?? 'Не указан',
          headeController: substation.head_controller ?? 'Не указан',
          channelCategory: 'Не указан',
          channelType: 'Не указан',
          channelIp: 'Не указан',
          gsm: 'Не указан',
          note: substation.note
        })
      }
    })

    this.#applyStyles(worksheet, ['note'])

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer
  }

  static async createExcelSubstationsTelemechanicsDevices(req: Request): Promise<ExcelJS.Buffer> {
    const substations = await SubstationService.getSubstations(req)
    const transformData = substations.data.map(substation => new SubstationsTelemechanicsDevicesReportDto(substation as Substation))
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    worksheet.columns = [
      { header: 'Район/ГП/УС', key: 'district', width: 20 },
      { header: 'Объект', key: 'name', width: 30 },
      { header: 'Тип объекта', key: 'objectType', width: 16 },
      { header: 'РДУ', key: 'rdu', width: 12 },
      { header: 'УТМ', key: 'ytm', width: 12 },
      { header: 'Тип КП', key: 'typeKp', width: 17 },
      { header: 'Головной контроллер', key: 'headeController', width: 26 },
      { header: 'Версия прошивки', key: 'controllerFirmwareVersion', width: 26 },
      { header: 'Примечание по УТМ', key: 'noteYTM', width: 50 },
      { header: 'Примечание по ПС', key: 'notePs', width: 50 },
    ]

    this.#applyStylesRowTitle(worksheet)

    transformData.forEach(substation => {
      if (substation.telemechanics_device && substation.telemechanics_device.length > 0) {
        substation.telemechanics_device?.forEach((device, i) => {
          worksheet.addRow({
            district: substation.district,
            name: substation.name,
            objectType: substation.object_type ?? 'Не указан',
            rdu: substation.rdu,
            ytm: `УТМ ${i + 1}`,
            typeKp: device.type_kp ?? 'Не указан',
            headeController: device.head_controller ?? 'Не указан',
            controllerFirmwareVersion: device.controllerFirmwareVersion ?? 'Не указан',
            noteYTM: device.note,
            notePs: substation.note
          })
        })
      } else {
        worksheet.addRow({
          district: substation.district,
          name: substation.name,
          objectType: substation.object_type ?? 'Не указан',
          rdu: substation.rdu,
          ytm: 'Не указан',
          typeKp: 'Не указан',
          headeController: 'Не указан',
          controllerFirmwareVersion: 'Не указан',
          noteYTM: '',
          notePs: substation.note
        })
      }
    })

    this.#applyStyles(worksheet, ['noteYTM', 'notePs'])

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer
  }

  static async createExcelChannels(req: Request): Promise<ExcelJS.Buffer> {
    const channels = await ChannelService.getChannels(req)
    const transformData = channels.data.map(channel => new ChannelDto(channel as Channel))
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    worksheet.columns = [
      { header: 'Объект', key: 'substation', width: 26 },
      { header: 'Категория канала', key: 'channelCategory', width: 30 },
      { header: 'Тип канала', key: 'channelType', width: 20 },
      { header: 'Тип оборудования', key: 'channelEquipment', width: 25 },
      { header: 'GSM оператор', key: 'gsmOperator', width: 20 },
      { header: 'IP адрес', key: 'ipAddress', width: 20 },
      { header: 'Примечание', key: 'note', width: 50 },
    ]

    this.#applyStylesRowTitle(worksheet)

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

    this.#applyStyles(worksheet, ['note'])

    const buffer = await workbook.xlsx.writeBuffer()

    return buffer
  }
}
