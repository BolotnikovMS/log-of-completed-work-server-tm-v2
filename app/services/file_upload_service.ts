import { ICSVSubstationKeyRow, IErrorParseCSVSubstationKey, IResultParseCSVSubstationKey } from '#domains/substations/interfaces/index'
import File from '#models/file'
import { fileSubstationKeyValidator, fileValidator } from '#validators/files'
import { csvDataSubstationKeyValidator } from '#validators/substation_keys_defect_file'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'
import { Request } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import csv from 'csv-parser'
import * as fs from 'node:fs'
import { unlink } from 'node:fs/promises'
import path from 'node:path'

export default class FilesServices {
  static async uploadFile(req: Request, userId: number | undefined): Promise<string> {
    const validateData = await req.validateUsing(fileValidator)

    validateData?.file.forEach(async (fileItem) => {
      const newFileName = `${cuid()}.${fileItem.extname}`

      await File.create({
        userId: userId,
        substationId: validateData.substationId,
        filePath: `/uploads/files/${validateData.typeFile}/${newFileName}`,
        clientName: fileItem.clientName,
        typeFile: validateData.typeFile,
        extname: fileItem.extname,
        size: +(fileItem.size / 1024).toFixed(3),
      })

      await fileItem.move(app.publicPath(`uploads/files/${validateData.typeFile}`), {
        name: newFileName,
        overwrite: true,
      })
    })

    // if (validateData.file) {
    //   const currentFile = validateData.file
    //   const newFileName = `${new Date().getTime()}${randomStr()}.${currentFile.extname}`
    //   await File.create({
    //     userId: userId || 1,
    //     substationId: 1,
    //     filePath: `/uploads/files/${validateData.typeFile}/${newFileName}`,
    //     clientName: currentFile.clientName,
    //     typeFile: validateData.typeFile,
    //     extname: currentFile.extname,
    //     size: +(currentFile.size / 1024).toFixed(3),
    //   })

    //   await currentFile.move(`tmp/uploads/files/${validateData.typeFile}`, {
    //     name: newFileName,
    //     overwrite: true,
    //   })
    // }

    return 'File uploaded!'
  }
  static async removeFile(id: number): Promise<string> {
    const file = await File.findOrFail(id)
    const filePath = path.join(app.publicPath(), file.filePath)

    try {
      await unlink(filePath)
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }

    await file.delete()

    return 'File deleted!'
  }
  // !! использование для джруших методов, сделать более гибким
  static async #moveFileInTmp(file: MultipartFile): Promise<string> {
    const fileName = `${cuid()}.${file.extname}`
    const filePath = app.tmpPath('uploads', fileName)

    await file.move(app.tmpPath('uploads'), {
      name: fileName,
      overwrite: true
    })

    return filePath
  }
  static async uploadCSVFileSubstationKey(req: Request) {
    const { csvFile } = await req.validateUsing(fileSubstationKeyValidator)
    const filePath = await this.#moveFileInTmp(csvFile)
    const results: IResultParseCSVSubstationKey[] = []
    const errors: IErrorParseCSVSubstationKey[] = []

    if (!filePath) {
      return { message: 'Ошибка при загрузке файла!' }
    }

    try {
      await new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath)

        stream.pipe(
          csv({
            mapHeaders: ({ header }) => header.trim(),
            mapValues: ({ value }) => value.trim(),
            separator: ';'
          })
        )
          .on('data', async (data: ICSVSubstationKeyRow) => {
            try {
              const { id, keyDefectSubstation } = data
              const validatedData = await csvDataSubstationKeyValidator.validate({
                id: +id,
                keyDefectSubstation: keyDefectSubstation === 'null' ? null : +keyDefectSubstation
              })

              results.push(validatedData)
            } catch (error) {
              console.log(error)
              errors.push({
                status: error.status,
                row: results.length + errors.length + 1,
                message: error.messages[0]?.message || 'Invalid data'
              })
            }
          })
          .on('end', () => {
            console.log('CSV processing completed')

            resolve({ validRows: results, errors })
          })
          .on('error', (error) => {
            reject(error)
          })
      })

      if (results.length && errors.length === 0) {
        await db.transaction(async (trx) => {
          for (const item of results) {
            try {
              await trx
                .from('substations')
                .where('id', item.id)
                .update({ key_defect_substation: item.keyDefectSubstation })
            } catch (error) {
              errors.push({
                status: 500,
                row: results.findIndex((r) => r.id === item.id) + 1,
                message: 'Database update failed',
              })

              return errors
            }
          }
        })
      } else {
        return { errors }
      }

      return { processed: results.length, message: errors.length ? errors[0].message : 'Данные успешно загружены из файла!', errors }
    } catch (errors) {
      return {
        message: 'Failed to process CSV',
        errors: [{ ...errors, status: 500 }],
      }
    } finally {
      console.log(`${filePath} удален!`)

      await unlink(filePath)
    }
  }
}
