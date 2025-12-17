import { CompletedWorkDto, CompletedWorkInfoDto, CompletedWorkListDto } from '#completed_work/dtos/index'
import CompletedWork from '#completed_work/models/completed_work'
import CompletedWorkService from '#completed_work/services/completed_work_service'
import { createCompletedWorkValidator, queryParamsCompletedWorkValidator, updateCompletedWorkValidator } from '#completed_work/validators/index'
import CompletedWorkPolicy from '#policies/completed_work_policy'
import ReportService from '#report/services/report_service'
import { accessErrorMessages } from '#shared/helpers/access_error_messages'
import type { Params } from '#shared/interfaces/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class CompletedWorksController {
  async index({ request, response }: HttpContext) {
    const filters = request.qs()
    const validatedFilters = await queryParamsCompletedWorkValidator.validate(filters)
    const data = await CompletedWorkService.getCompletedWorks(validatedFilters)
    const works = CompletedWorkListDto.fromPaginator(data)

    return response.status(200).json(works)
  }

  async getCompletedWork({ params, response }: HttpContext) {
    const completedWorkParams = params as Params
    const completedWork = await CompletedWorkService.findById(completedWorkParams.id)

    return response.status(200).json(new CompletedWorkDto(completedWork))
  }

  async getCompletedWorkInfo({ params, response }: HttpContext) {
    const completedWorkParams = params as Params
    const completedWork = await CompletedWorkService.findInfoById(completedWorkParams.id)

    return response.status(200).json(new CompletedWorkInfoDto(completedWork))
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(CompletedWorkPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const validatedData = await request.validateUsing(createCompletedWorkValidator)
    const completedWork = await CompletedWorkService.create({ ...validatedData, userId: auth.user!.id })

    return response.status(201).json(completedWork)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    const completedWorkParams = params as Params
    const completedWork = await CompletedWork.findOrFail(completedWorkParams.id)

    if (await bouncer.with(CompletedWorkPolicy).denies('edit', completedWork)) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const validatedData = await request.validateUsing(updateCompletedWorkValidator)
    const updCompletedWork = await CompletedWorkService.update(completedWorkParams.id, validatedData)

    return response.status(200).json(updCompletedWork)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(CompletedWorkPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const completedWorkParams = params as Params

    await CompletedWorkService.delete(completedWorkParams.id)

    return response.status(204)
  }

  async downloadExcel({ request, response }: HttpContext) {
    const filters = request.qs()
    const validatedFilters = await queryParamsCompletedWorkValidator.validate(filters)
    const buffer = await ReportService.createExcelCompletedWorks(validatedFilters)

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename=example.xlsx')
    response.send(buffer)
  }
}
