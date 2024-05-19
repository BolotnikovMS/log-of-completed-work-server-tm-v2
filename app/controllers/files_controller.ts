import * as fs from 'node:fs'

import File from '#models/file'
import FilesServices from '#services/file_upload_service'
import type { HttpContext } from '@adonisjs/core/http'

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

    if (fs.existsSync(`tmp/${file.filePath}`)) {
      return response.status(200).attachment(`tmp/${file.filePath}`, file.clientName)
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
}
