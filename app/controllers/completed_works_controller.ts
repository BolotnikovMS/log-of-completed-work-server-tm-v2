import { CompletedWorkDto, CompletedWorkInfoDto, CompletedWorkListDto } from '#dtos/completed_works/index'
import { accessErrorMessages } from '#helpers/access_error_messages'
import { IParams } from '#interfaces/params'
import CompletedWork from '#models/completed_work'
import CompletedWorkPolicy from '#policies/completed_work_policy'
import CompletedWorkService from '#services/completed_wokr_service'
import ReportService from '#services/report_service'
import { completedWorkValidator } from '#validators/completed_work'
import type { HttpContext } from '@adonisjs/core/http'

export default class CompletedWorksController {
  async index({ request, response }: HttpContext) {
    const { meta, data } = await CompletedWorkService.getCompletedWorks(request)
    const works = { meta, data: data.map(work => new CompletedWorkListDto(work as CompletedWork)) }

    return response.status(200).json(works)
  }

  async getCompletedWork({ params, response }: HttpContext) {
    const completedWorkParams = params as IParams
    const completedWork = await CompletedWorkService.getCompletedWorkById(completedWorkParams)

    return response.status(200).json(new CompletedWorkDto(completedWork))
  }

  async getCompletedWorkInfo({ params, response }: HttpContext) {
    const completedWorkParams = params as IParams
    const completedWork = await CompletedWorkService.getCompletedWorkInfo(completedWorkParams)

    return response.status(200).json(new CompletedWorkInfoDto(completedWork))
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(CompletedWorkPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const completedWork = await CompletedWorkService.createWork(request, auth)

    return response.status(201).json(completedWork)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    const completedWork = await CompletedWork.findOrFail(params.id)

    if (await bouncer.with(CompletedWorkPolicy).denies('edit', completedWork)) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }
    const validatedData = await request.validateUsing(completedWorkValidator)
    const updCompletedWork = await completedWork.merge({ ...validatedData }).save()

    return response.status(200).json(updCompletedWork)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(CompletedWorkPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const completedWorkParams = params as IParams

    await CompletedWorkService.deleteWork(completedWorkParams)

    return response.status(204)
  }

  async downloadExcel({ request, response }: HttpContext) {
    const buffer = await ReportService.createExcelCompletedWorks(request)

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename=example.xlsx')
    response.send(buffer)
  }
}
