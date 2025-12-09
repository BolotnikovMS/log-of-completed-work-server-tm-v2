import HeadControllerDto from '#head_controller/dtos/head_controller'
import { HeadControllersService } from '#head_controller/services/head_controller_service'
import { createHeadControllerValidator, updateHeadControllerValidator } from '#head_controller/validators/index'
import HeadControllerPolicy from '#policies/head_controller_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { BaseQueryParams, Params } from '#shared/interfaces/index'
import { baseQueryParamsValidator } from '#shared/validators/query_param'
import type { HttpContext } from '@adonisjs/core/http'

export default class HeadsController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs() as BaseQueryParams
    const validatedFilters = await baseQueryParamsValidator.validate(filters)
    const data = await HeadControllersService.getHeadControllers(validatedFilters)
    const headControllers = HeadControllerDto.fromPaginator(data)

    return response.status(200).json(headControllers)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(HeadControllerPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createHeadControllerValidator)
    const newHeadController = await HeadControllersService.create({ ...validatedData, userId: auth.user!.id })

    return response.status(201).json(newHeadController)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(HeadControllerPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const headControllerParams = params as Params
    const validatedData = await request.validateUsing(updateHeadControllerValidator)
    const updHeadController = await HeadControllersService.update(headControllerParams.id, validatedData)

    return response.status(200).json(updHeadController)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(HeadControllerPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const headControllerParams = params as Params

    await HeadControllersService.delete(headControllerParams.id)

    return response.status(204)
  }
}
