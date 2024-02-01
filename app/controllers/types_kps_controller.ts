import TypeKp from '#models/type_kp'
import TypeKpService from '#services/type_kp_service'
import { typeKpValidator } from '#validators/type_kp'
import type { HttpContext } from '@adonisjs/core/http'

export default class TypesKpsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const typesKps = await TypeKpService.getTypesKps(request)

    return response.status(200).json(typesKps)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const validatedData = await request.validateUsing(typeKpValidator)
    const typeKp = await TypeKp.create({ userId: 1, ...validatedData })

    return response.status(201).json(typeKp)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const typeKp = await TypeKp.findOrFail(params.id)
    const validatedData = await request.validateUsing(typeKpValidator)
    const updTypeKp = await typeKp.merge(validatedData).save()

    return response.status(200).json(updTypeKp)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const typeKp = await TypeKp.findOrFail(params.id)

    await typeKp.delete()

    return response.status(204)
  }
}
