import { accessErrorMessages } from '#helpers/access_error_messages'
import Modem from '#models/modem'
import ModemPolicy from '#policies/modem_policy'
import ModemService from '#services/modem_service'
import { modemValidator } from '#validators/modem'
import type { HttpContext } from '@adonisjs/core/http'

export default class ModemsController {
  async index({ request, response }: HttpContext) {
    const modems = await ModemService.getModems(request)

    return response.status(200).json(modems)
  }

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with(ModemPolicy).denies('create')) {
      return response.status(403).json({ message: accessErrorMessages.create })
    }

    const { user } = auth
    const validatedData = await request.validateUsing(modemValidator)
    const modem = await Modem.create({ userId: user?.id, ...validatedData })

    return response.status(200).json(modem)
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    if (await bouncer.with(ModemPolicy).denies('edit')) {
      return response.status(403).json({ message: accessErrorMessages.edit })
    }

    const modem = await Modem.findOrFail(params.id)
    const validatedData = await request.validateUsing(modemValidator)
    const updModem = await modem.merge(validatedData).save()

    return response.status(200).json(updModem)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    if (await bouncer.with(ModemPolicy).denies('delete')) {
      return response.status(403).json({ message: accessErrorMessages.delete })
    }

    const modem = await Modem.findOrFail(params.id)

    await modem.delete()

    return response.status(204)
  }
}
