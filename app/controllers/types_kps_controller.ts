import TypeKpDto from '#dtos/type_kp'
import { accessErrorMessages } from '#helpers/access_error_messages'
import TypeKp from '#models/type_kp'
import TypeKpPolicy from '#policies/type_kp_policy'
import TypeKpService from '#services/type_kp_service'
import { typeKpValidator } from '#validators/type_kp'
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

    const { user } = auth
    const validatedData = await request.validateUsing(typeKpValidator)
    const typeKp = await TypeKp.create({ userId: user?.id, ...validatedData })

    return response.status(201).json(typeKp)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(TypeKpPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const typeKp = await TypeKp.findOrFail(params.id)
    const validatedData = await request.validateUsing(typeKpValidator)
    const updTypeKp = await typeKp.merge(validatedData).save()

    return response.status(200).json(updTypeKp)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(TypeKpPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const typeKp = await TypeKp.findOrFail(params.id)

    await typeKp.delete()

    return response.status(204)
  }
}
