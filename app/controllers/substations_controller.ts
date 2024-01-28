import type { HttpContext } from '@adonisjs/core/http'

export default class SubstationsController {
  async index({ request, response }: HttpContext) {}

  async store({ request, response }: HttpContext) {}

  async update({ params, request, response }: HttpContext) {}

  async destroy({ params, response }: HttpContext) {}
}
