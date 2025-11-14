import TypeKpPolicy from '#policies/type_kp_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { IParams } from '#shared/interfaces/params'
import type { IQueryParams } from '#shared/interfaces/query_params'
import { queryParamsValidator } from '#shared/validators/query_param'
import TypeKpDto from '#type_kp/dtos/type_kp'
import TypeKpService from '#type_kp/services/type_kp_service'
import { createTypeKpValidator, updateTypeKpValidator } from '#type_kp/validators/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class TypesKpsController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs() as IQueryParams
    const validatedFilters = await queryParamsValidator.validate(filters)
    const data = await TypeKpService.getTypesKps(validatedFilters)
    const typesKps = TypeKpDto.fromPaginator(data)

    return response.status(200).json(typesKps)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(TypeKpPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createTypeKpValidator)
    const typeKp = await TypeKpService.create({ ...validatedData, userId: auth.user!.id })

    return response.status(201).json(typeKp)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(TypeKpPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const typeKpParams = params as IParams
    const validatedData = await request.validateUsing(updateTypeKpValidator)
    const updTypeKp = await TypeKpService.update(typeKpParams.id, validatedData)

    return response.status(200).json(updTypeKp)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(TypeKpPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const typeKpParams = params as IParams

    await TypeKpService.delete(typeKpParams.id)

    return response.status(204)
  }
}
