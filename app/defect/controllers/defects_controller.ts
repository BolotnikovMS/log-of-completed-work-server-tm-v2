import { DefectInfoDto, DefectListDto } from '#defect/dtos/index'
import DefectService from '#defect/services/defect_service'
import { DefectStatus } from '#defect/types/defect_category'
import { createClosesDefect, createDefect, queryParamsDefectValidator, updateDefect } from '#defect/validators/index'
import DefectPolicy from '#policies/defect_policy'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { Params } from '#shared/interfaces/params'
import type { HttpContext } from '@adonisjs/core/http'

export default class DefectsController {
  async getDefectList({ request, response }: HttpContext) {
    const filters = request.qs()
    const validatedFilters = await queryParamsDefectValidator.validate(filters)
    const data = await DefectService.getDefects(validatedFilters)
    const defects = DefectListDto.fromPaginator(data)

    return response.status(200).json(defects)
  }

  async getDefect({ params, response }: HttpContext) {
    const defectParams = params as Params
    const defect = await DefectService.findById(defectParams.id)

    return response.status(200).json(defect)
  }

  async getDefectInfo({ params, response }: HttpContext) {
    const defectParams = params as Params
    const data = await DefectService.findInfoById(defectParams.id)

    return response.status(200).json(new DefectInfoDto(data))
  }

  async storeDefect({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(DefectPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createDefect)
    const defect = await DefectService.createDefect({ ...validatedData, userId: auth.user?.id! })

    return response.status(200).json(defect)
  }

  async updateDefect({ params, request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(DefectPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const defectParams = params as Params
    const validatedData = await request.validateUsing(updateDefect)
    const updDefect = await DefectService.updateDefect(defectParams.id, { ...validatedData, userId: auth.user?.id! })

    return response.status(200).json(updDefect)
  }

  async storeClosesDefect({ params, request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(DefectPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const defectParams = params as Params
    const validatedData = await request.validateUsing(createClosesDefect)
    const data = await DefectService.createCloses(defectParams.id, { ...validatedData, userId: auth.user?.id!, status: DefectStatus.close })

    return response.status(200).json(data)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(DefectPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const substationParam = params as Params

    await DefectService.delete(substationParam.id)

    return response.status(204)
  }
}
