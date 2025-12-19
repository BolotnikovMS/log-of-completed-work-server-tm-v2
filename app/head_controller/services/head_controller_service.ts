import HeadController from '#head_controller/models/head_controller'
import type { CreateHeadController, UpdateHeadController } from '#head_controller/types/head_controller'
import type { BaseQueryParams } from '#shared/interfaces/query_params'

export class HeadControllersService {
  static async getHeadControllers(filters: BaseQueryParams) {
    const { sort, order, limit, page } = filters
    const headControllers = await HeadController.query()
      .if(sort && order, (query) => query.orderBy(sort!, order))
      .paginate(page!, limit)

    return headControllers
  }

  static async create(data: CreateHeadController): Promise<HeadController> {
    const headController = await HeadController.create(data)

    return headController
  }

  static async update(id: number, data: UpdateHeadController): Promise<HeadController> {
    const headController = await HeadController.findOrFail(id)
    const updHeadController = await headController.merge(data).save()

    return updHeadController
  }

  static async delete(id: number): Promise<void> {
    const headController = await HeadController.findOrFail(id)

    await headController.delete()

    return
  }
}
