import HeadController from '#head_controller/models/head_controller'
import { headControllerValidator } from '#head_controller/validators/head_controller'
import { OrderByEnums } from '#shared/enums/sort'
import { IParams, IQueryParams } from '#shared/interfaces/index'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'

export class HeadControllersService {
  static async getHeadControllers(req: Request): Promise<{
    meta: any,
    data: ModelObject[]
  }> {
    const { sort, order, limit = -1, page } = req.qs() as IQueryParams
    const headControllers = await HeadController.query()
      .if(sort && order, (query) => query.orderBy(sort, OrderByEnums[order]))
      .paginate(page, limit)

    return headControllers.serialize()
  }

  static async createHeadController(req: Request, auth: Authenticator<Authenticators>): Promise<HeadController> {
    const { user } = auth
    const validatedData = await req.validateUsing(headControllerValidator)
    const headController = await HeadController.create({ userId: user?.id, ...validatedData })

    return headController
  }

  static async updateHeadController(req: Request, params: IParams): Promise<HeadController> {
    const headController = await HeadController.findOrFail(params.id)
    const validatedData = await req.validateUsing(headControllerValidator)
    const updHeadController = await headController.merge(validatedData).save()

    return updHeadController
  }

  static async deleteHeadController(params: IParams): Promise<void> {
    const headController = await HeadController.findOrFail(params.id)

    await headController.delete()
  }
}
