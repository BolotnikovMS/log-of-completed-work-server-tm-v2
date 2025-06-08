import { TypeWorkDto } from '#dtos/types_work/index'
import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import TypeWork from '#models/type_work'
import TypeWorkPolicy from '#policies/type_work_policy'
import TypeWorkService from '#services/type_work_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class TypesWorksController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await TypeWorkService.getTypesWork(request)
    const typesWork = { meta, data: data.map(typeWork => new TypeWorkDto(typeWork as TypeWork)) }

    return response.status(200).json(typesWork)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(TypeWorkPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const typeWork = await TypeWorkService.createTypeWork(request, auth)

    return response.status(201).json(typeWork)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(TypeWorkPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const typeWorkParams = params as IParams
    const updTypeWork = await TypeWorkService.updateTypeWork(request, typeWorkParams)

    return response.status(200).json(updTypeWork)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(TypeWorkPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }
    const typeWorkParams = params as IParams

    await TypeWorkService.deleteTypeWork(typeWorkParams)

    return response.status(204)
  }
}
