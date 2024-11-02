import HeadControllerDto from '#dtos/head_controller'
import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import HeadController from '#models/head_controller'
import HeadControllerPolicy from '#policies/head_controller_policy'
import { HeadControllersService } from '#services/head_controller_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class HeadsController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await HeadControllersService.getHeadControllers(request)
    const headControllers = { meta, data: data.map(headController => new HeadControllerDto(headController as HeadController)) }

    return response.status(200).json(headControllers)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(HeadControllerPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const newHeadController = await HeadControllersService.createHeadController(request, auth)

    return response.status(201).json(newHeadController)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(HeadControllerPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const headControllerParams = params as IParams
    const updHeadController = await HeadControllersService.updateHeadController(request, headControllerParams)

    return response.status(200).json(updHeadController)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(HeadControllerPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const headControllerParams = params as IParams

    await HeadControllersService.deleteHeadController(headControllerParams)

    return response.status(204)
  }
}
