import SubstationPolicy from '#policies/substation_policy'
import ReportService from '#report/services/report_service'
import { accessErrorMessages, transliterate } from '#shared/helpers/index'
import type { Params } from '#shared/interfaces/index'
import { SubstationDto, SubstationInfoDto, SubstationListDto, SubstationSelectOptionDto } from '#substation/dtos/index'
import type { SubstationQueryParams } from '#substation/interfaces/index'
import SubstationService from '#substation/services/substation_service'
import { createSubstationValidator, queryParamsSubstationsValidator, substationKeyDefectValidator, substationNoteValidator, updateSubstationValidator } from '#substation/validators/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class SubstationsController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs() as SubstationQueryParams
    const validatedFilters = await queryParamsSubstationsValidator.validate(filters)
    const data = await SubstationService.getSubstations(validatedFilters)
    const substations = SubstationListDto.fromPaginator(data)

    return response.status(200).json(substations)
  }

  async getSubstationsForSelect({ response }: HttpContext) {
    const data = await SubstationService.getSubstations()
    const substations = SubstationSelectOptionDto.fromPaginator(data)

    return response.status(200).json(substations)
  }

  async getSubstation({ params, response }: HttpContext) {
    const substationParam = params as Params
    const data = await SubstationService.findById(substationParam.id)

    return response.status(200).json(new SubstationDto(data))
  }

  async getSubstationInfo({ params, response }: HttpContext) {
    const substationParam = params as Params
    const data = await SubstationService.getInfo(substationParam.id)

    return response.status(200).json({ ...new SubstationInfoDto(data.substation), numberCompletedWorks: data.numberCompletedWorks })
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(SubstationPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createSubstationValidator)
    const substation = await SubstationService.create({
      ...validatedData,
      userId: auth.user!.id,
      nameSearch: transliterate(validatedData.name)
    })

    return response.status(201).json(substation)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(SubstationPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const substationParam = params as Params
    const validatedData = await request.validateUsing(updateSubstationValidator)
    const updSubstation = await SubstationService.update(substationParam.id, {
      ...validatedData,
      nameSearch: validatedData.name && transliterate(validatedData.name)
    })

    return response.status(200).json(updSubstation)
  }

  async updateNote({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(SubstationPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const substationParam = params as Params
    const validatedData = await request.validateUsing(substationNoteValidator)
    const updSubstation = await SubstationService.updateNote(substationParam.id, validatedData)

    return response.status(200).json(updSubstation)
  }


  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(SubstationPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const substationParam = params as Params

    await SubstationService.delete(substationParam.id)

    return response.status(204)
  }

  async downloadSubstationsExcel({ request, response }: HttpContext) {
    const filters = request.qs() as SubstationQueryParams
    const validatedFilters = await queryParamsSubstationsValidator.validate(filters)
    const buffer = await ReportService.createExcelSubstations(validatedFilters)

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename=example.xlsx')
    response.send(buffer)
  }

  async downloadSubstationsSubstationsTelemechanicsDevicesExcel({ request, response }: HttpContext) {
    const filters = request.qs() as SubstationQueryParams
    const validatedFilters = await queryParamsSubstationsValidator.validate(filters)
    const buffer = await ReportService.createExcelSubstationsTelemechanicsDevices(validatedFilters)

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename=example.xlsx')
    response.send(buffer)
  }

  async updateKeyDefectSubstation({ request, response, params, bouncer }: HttpContext) {
    if (await bouncer.with(SubstationPolicy).denies('updateKeyDefectSubstation')) {
      return response.status(403).json({ message: accessErrorMessages.noRights })
    }

    const substationParam = params as Params
    const validatedData = await request.validateUsing(substationKeyDefectValidator)
    const updSubstation = await SubstationService.updateKeyDefect(substationParam.id, validatedData)

    return response.status(200).json(updSubstation)
  }
}
