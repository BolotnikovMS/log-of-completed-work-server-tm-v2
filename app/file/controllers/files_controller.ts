import File from '#file/models/file'
import FilesServices from '#file/services/file_upload_service'
import { fileSubstationKeyValidator, fileUpdateNameValidator, uploadFileSubstationValidator } from '#file/validators/index'
import FilePolicy from '#policies/file_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { Params } from '#shared/interfaces/index'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import * as fs from 'node:fs'
import path from 'node:path'

export default class FilesController {
  async upload({ request, response, auth }: HttpContext) {
    const validatedData = await request.validateUsing(uploadFileSubstationValidator)
    const test = await FilesServices.uploadFile({ ...validatedData, userId: auth.user!.id })

    return response.status(201).json(test)
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

  async uploadCSVFileSubstationKey({ request, response, bouncer }: HttpContext) {
    if (await bouncer.with(FilePolicy).denies('uploadCSVFileSubstationKey')) {
      return response.status(403).json({ message: accessErrorMessages.noRights })
    }

    const validatedData = await request.validateUsing(fileSubstationKeyValidator)
    const data = await FilesServices.uploadCSVFileSubstationKey(validatedData)

    if (data.errors && data.errors.length !== 0) {
      return response.status(data.errors[0].status!).json(data)
    }

    response.status(200).json(data)
  }

  async updateFileName({ request, response, params, bouncer }: HttpContext) {
    if (await bouncer.with(FilePolicy).denies('updateNameFile')) {
      return response.status(403).json({ message: accessErrorMessages.noRights })
    }

    const validatedData = await request.validateUsing(fileUpdateNameValidator)
    const fileParams = params as Params

    await FilesServices.updateNameFile(fileParams.id, validatedData)

    return response.status(200).json({ message: 'Имя файла изменено!' })
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
