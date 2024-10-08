import { accessErrorMessages } from '#helpers/access_error_messages'
import CompletedWork from '#models/completed_work'
import CompletedWorkPolicy from '#policies/completed_work_policy'
import CompletedWorkService from '#services/completed_wokr_service'
import { completedWorkValidator } from '#validators/completed_work'
import type { HttpContext } from '@adonisjs/core/http'

export default class CompletedWorksController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const works = await CompletedWorkService.getCompletedWorks(request)

    return response.status(200).json(works)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(CompletedWorkPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const { user } = auth
    const validatedData = await request.validateUsing(completedWorkValidator)
    const completedWork = await CompletedWork.create({
      userId: user?.id,
      ...validatedData,
    })

    return response.status(201).json(completedWork)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, bouncer }: HttpContext) {
    const completedWork = await CompletedWork.findOrFail(params.id)

    if (await bouncer.with(CompletedWorkPolicy).denies('edit', completedWork)) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }
    const validatedData = await request.validateUsing(completedWorkValidator)
    const updCompletedWork = await completedWork.merge({ ...validatedData }).save()

    return response.status(200).json(updCompletedWork)
  }

  /**
   * Delete record
   */
  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(CompletedWorkPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const completedWork = await CompletedWork.findOrFail(params.id)

    await completedWork.delete()

    return response.status(204)
  }

  async downloadExcel({ request, response }: HttpContext) {
    const buffer = await CompletedWorkService.createExcelFile(request)

    response.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response.header('Content-Disposition', 'attachment; filename=example.xlsx')
    response.send(buffer)
  }
}
