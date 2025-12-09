import { ObjectTypeDto, ObjectTypeShortDto } from '#object_type/dtos/index'
import ObjectTypeService from '#object_type/services/object_type_service'
import { createObjectTypeValidator } from '#object_type/validators/create_object_type'
import { updateObjectTypeValidator } from '#object_type/validators/update_object_type'
import ObjectTypePolicy from '#policies/object_type_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { BaseQueryParams, Params } from '#shared/interfaces/index'
import { baseQueryParamsValidator } from '#shared/validators/query_param'
import type { HttpContext } from '@adonisjs/core/http'

export default class ObjectTypesController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs() as BaseQueryParams
    const validatedFilters = await baseQueryParamsValidator.validate(filters)
    const data = await ObjectTypeService.getObjectTypes(validatedFilters)
    const objectTypes = ObjectTypeShortDto.fromPaginator(data)

    return response.status(200).json(objectTypes)
  }

  async getObjectType({ params, response }: HttpContext) {
    const objectTypeParams = params as Params
    const data = await ObjectTypeService.findById(objectTypeParams.id)
    const objectType = new ObjectTypeDto(data)

    return response.status(200).json(objectType)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ObjectTypePolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createObjectTypeValidator)
    const objectType = await ObjectTypeService.create({ ...validatedData, userId: auth.user!.id })

    return response.status(201).json(objectType)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ObjectTypePolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const objectTypeParams = params as Params
    const validatedData = await request.validateUsing(updateObjectTypeValidator)
    const updObjectType = await ObjectTypeService.update(objectTypeParams.id, validatedData)

    return response.status(200).json(updObjectType)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ObjectTypePolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const objectTypeParams = params as Params

    await ObjectTypeService.delete(objectTypeParams.id)

    return response.status(204)
  }
}
