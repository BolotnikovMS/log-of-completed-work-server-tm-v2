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
