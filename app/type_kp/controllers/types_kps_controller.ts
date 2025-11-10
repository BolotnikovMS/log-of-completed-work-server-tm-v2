import { IParams } from '#interfaces/params'
import TypeKpPolicy from '#policies/type_kp_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import TypeKpDto from '#type_kp/dtos/type_kp'
import TypeKp from '#type_kp/models/type_kp'
import TypeKpService from '#type_kp/services/type_kp_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class TypesKpsController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await TypeKpService.getTypesKps(request)
    const typesKps = { meta, data: data.map(typeKp => new TypeKpDto(typeKp as TypeKp)) }

    return response.status(200).json(typesKps)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(TypeKpPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const typeKp = await TypeKpService.createTypeKp(request, auth)

    return response.status(201).json(typeKp)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(TypeKpPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const typeKpParams = params as IParams
    const updTypeKp = await TypeKpService.updateTypeKp(request, typeKpParams)

    return response.status(200).json(updTypeKp)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(TypeKpPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const typeKpParams = params as IParams

    await TypeKpService.deleteTypeKp(typeKpParams)

    return response.status(204)
  }
}
