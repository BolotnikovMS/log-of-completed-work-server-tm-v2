import TypeWorkPolicy from '#policies/type_work_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { IParams } from '#shared/interfaces/params'
import type { BaseQueryParams } from '#shared/interfaces/query_params'
import { queryParamsValidator } from '#shared/validators/query_param'
import { TypeWorkDto } from '#type_work/dtos/index'
import TypeWorkService from '#type_work/services/type_work_service'
import { createTypeWorkValidator } from '#type_work/validators/create_type_work'
import { updateTypeWorkValidator } from '#type_work/validators/update_type_work'
import type { HttpContext } from '@adonisjs/core/http'

export default class TypesWorksController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs() as BaseQueryParams
    const validatedFilters = await queryParamsValidator.validate(filters)
    const data = await TypeWorkService.getTypesWork(validatedFilters)
    const typesWork = TypeWorkDto.fromPaginator(data)

    return response.status(200).json(typesWork)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(TypeWorkPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createTypeWorkValidator)
    const typeWork = await TypeWorkService.createTypeWork({ ...validatedData, userId: auth.user!.id })

    return response.status(201).json(typeWork)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(TypeWorkPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const typeWorkParams = params as IParams
    const validatedData = await request.validateUsing(updateTypeWorkValidator)
    const updTypeWork = await TypeWorkService.updateTypeWork(typeWorkParams.id, validatedData)

    return response.status(200).json(updTypeWork)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(TypeWorkPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }
    const typeWorkParams = params as IParams

    await TypeWorkService.deleteTypeWork(typeWorkParams.id)

    return response.status(204)
  }
}
