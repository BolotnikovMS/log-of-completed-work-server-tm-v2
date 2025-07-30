import File from '#models/file'
import FilesServices from '#services/file_upload_service'
import { numberCheck } from '#validators/fields_check'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import csv from 'csv-parser'
import * as fs from 'node:fs'
import path from 'node:path'

const fileSubstationKeyValidator = vine.compile(
  vine.object({
    csvFile: vine.file({
      size: '10mb',
      extnames: ['csv']
    })
  })
)
const csvDataSubstationKeyValidator = vine.compile(
  vine.object({
    id: numberCheck.exists({ table: 'substations', column: 'id' }),
    keyDefectSubstation: numberCheck
  })
)

type TResultParseCSVKey = {
  id: number
  keyDefectSubstation: number
}

type TErrorParseCSVKey = {
  row: number
  error: string
}

export default class FilesController {
  async upload({ request, response, auth }: HttpContext) {
    const user = auth?.user

    try {
      const test = await FilesServices.uploadFile(request, user?.id)

      return response.status(200).json(test)
    } catch (err) {
      console.log(err)

      return response.status(422).json(err)
    }
  }

  async download({ response, params }: HttpContext) {
    const file = await File.findOrFail(params.id)
    const filePath = path.join(app.publicPath(), file.filePath)

    if (fs.existsSync(filePath)) {
      return response.status(200).download(filePath)
    }

    return response.status(400).json({ messages: 'Download error!' })
  }

  async destroy({ response, params }: HttpContext) {
    try {
      const message = await FilesServices.removeFile(params.id)

      return response.status(200).json(message)
    } catch (err) {
      console.log(err)
      return response.status(404).json(err)
    }
  }

  async uploadSubstationKey({ request, response }: HttpContext) {
    const { csvFile } = await request.validateUsing(fileSubstationKeyValidator)
    const results: TResultParseCSVKey[] = []
    const errors: TErrorParseCSVKey[] = []
    const filePath = await csvFile.move(app.tmpPath('uploads'), {
      name: `${cuid()}.${csvFile.extname}`,
      overwrite: true
    })

    if (!filePath) {
      return response.status(500).json({ message: 'Ошибка при загрузке файла!' })
    }

    try {
      await new Promise((resolve, reject) => {
        
        fs
          .createReadStream(csvFile.tmpPath!)
          .pipe(
            csv({
              mapHeaders: ({ header }) => header.trim(),
              mapValues: ({ value }) => value.trim(),
              separator: ';'
            })
          )
          .on('data', async (data) => {
            try {
              // Валидация данных строки
              const validatedData = await csvDataSubstationKeyValidator.validate({
                id: parseInt(data.id),
                keyDefectSubstation: parseInt(data.keyDefectSubstation),
              })

              results.push({
                id: validatedData.id,
                keyDefectSubstation: validatedData.keyDefectSubstation,
              })
            } catch (error) {
              console.log(error)

              errors.push({
                row: results.length + errors.length + 1,
                error: error.messages[0]?.message || 'Invalid data'
              })
            }
          })
          .on('end', () => {
            console.log('CSV processing completed')

            resolve(true)
          })
          .on('error', (error) => {
            reject(error)
          })
      })

      console.log('Result: ', results)
      console.log('Errors: ', errors)

      // Массовое обновление в транзакции
      await db.transaction(async (trx) => {
        for (const item of results) {
          try {
            await trx
              .from('substations')
              .where('id', item.id)
              .update({ key_defect_substation: item.keyDefectSubstation })
          } catch (error) {
            errors.push({
              row: results.findIndex((r) => r.id === item.id) + 1,
              error: 'Database update failed',
            })
            throw error // Откатываем транзакцию при ошибке
          }
        }
      })

      return response.ok({
        success: true,
        processed: results.length,
        errors,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Failed to process CSV',
        errors,
      })
    } finally {
      // Удаляем временный файл
      // if (csvFile.csvFile.tmpPath) {
      //   fs.unlink(csvFile.csvFile.tmpPath, () => { })
      // }
    }
  }

  // async getImages({ request, response }: HttpContext) {
  //   const { substation } = request.qs() as IQueryParams
  //   const files = await File.query()
  //     .where('substation_id', '=', substation)
  //     .where('type_file', '=', 'photo_ps')

  //   files.forEach(async (file) => {
  //     if (fs.existsSync(`tmp/${file.filePath}`)) {
  //       return response.status(200).attachment(`tmp/${file.filePath}`, file.clientName)
  //     } else {
  //       return response.status(400).json({ messages: 'Error while receiving images' })
  //     }
  //   })
  // }
}
