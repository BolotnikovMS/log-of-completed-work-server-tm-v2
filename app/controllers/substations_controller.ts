import SubstationDto from '#dtos/substation'
import SubstationListDto from '#dtos/substation_lists'
import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import Substation from '#models/substation'
import SubstationPolicy from '#policies/substation_policy'
import SubstationService from '#services/substation_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class SubstationsController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await SubstationService.getSubstations(request)
    const substations = { meta, data: data.map(substation => new SubstationListDto(substation as Substation)) }

    return response.status(200).json(substations)
  }

  async getSubstation({ params, response }: HttpContext) {
    const data = await SubstationService.getSubstation(params)

    return response.status(200).json({ ...new SubstationDto(data.substation), numberCompletedWorks: data.numberCompletedWorks })
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(SubstationPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const substation = await SubstationService.createSubstation(request, auth)

    return response.status(201).json(substation)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(SubstationPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const substationParam = params as IParams
    const updSubstation = await SubstationService.update(request, substationParam)

    return response.status(200).json(updSubstation)
  }

  async updateNote({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(SubstationPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const substationParam = params as IParams
    const updSubstation = await SubstationService.updateNote(request, substationParam)

    return response.status(200).json(updSubstation)
  }


  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(SubstationPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const substationParam = params as IParams

    await SubstationService.deleteSubstation(substationParam)

    return response.status(204)
  }

  async downloadSubstationsExcel({ request, response }: HttpContext) {
    const buffer = await SubstationService.createExcelFile(request)

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename=example.xlsx')
    response.send(buffer)
  }
}
