import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import { ObjectTypeDto, ObjectTypeShortDto } from '#object_type/dtos/index'
import ObjectType from '#object_type/models/object_type'
import ObjectTypeService from '#object_type/services/object_type_service'
import ObjectTypePolicy from '#policies/object_type_policy'
import type { HttpContext } from '@adonisjs/core/http'

export default class ObjectTypesController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await ObjectTypeService.getObjectTypes(request)
    const objectTypes = { meta, data: data.map(objectType => new ObjectTypeShortDto(objectType as ObjectType)) }

    return response.status(200).json(objectTypes)
  }

  async getObjectType({ params, response }: HttpContext) {
    const objectTypeParams = params as IParams
    const objectType = new ObjectTypeDto(await ObjectTypeService.getObjectTypeById(objectTypeParams))

    return response.status(200).json(objectType)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ObjectTypePolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const objectType = await ObjectTypeService.createObjectType(request, auth)

    return response.status(201).json(objectType)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ObjectTypePolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const objectTypeParams = params as IParams
    const updObjectType = await ObjectTypeService.updateObjectType(request, objectTypeParams)

    return response.status(200).json(updObjectType)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ObjectTypePolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const objectTypeParams = params as IParams

    await ObjectTypeService.deleteObjectType(objectTypeParams)

    return response.status(204)
  }
}
