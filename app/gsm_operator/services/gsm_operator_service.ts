import GsmOperator from '#gsm_operator/models/gsm_operator'
import type { CreateGsmOperator, UpdateGsmOperator } from '#gsm_operator/types/gsm_operator'
import type { BaseQueryParams } from '#shared/interfaces/query_params'

export default class GsmOperatorService {
  static async getGsmOperators(filters: BaseQueryParams): Promise<GsmOperator[]> {
    const { sort, order } = filters
    const gsmOperators = await GsmOperator.query()
      .if(sort && order, (query) =>
        query.orderBy(sort!, order)
      )

    return gsmOperators
  }

  static async findById(id: number): Promise<GsmOperator> {
    const gsmOperator = await GsmOperator.findOrFail(id)

    return gsmOperator
  }

  static async create(data: CreateGsmOperator): Promise<GsmOperator> {
    const gsmOperator = await GsmOperator.create(data)

    return gsmOperator
  }

  static async update(id: number, data: UpdateGsmOperator): Promise<GsmOperator> {
    const gsmOperator = await GsmOperator.findOrFail(id)
    const updGsmOperator = await gsmOperator.merge(data).save()

    return updGsmOperator
  }

  static async delete(id: number): Promise<void> {
    const gsmOperator = await GsmOperator.findOrFail(id)

    await gsmOperator.delete()

    return
  }
}
