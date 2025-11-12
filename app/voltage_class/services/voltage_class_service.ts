import { IQueryParams } from '#shared/interfaces/index'
import { INewVoltageClass, IUpdVoltageClass } from '#voltage_class/interfaces/index'
import VoltageClass from '#voltage_class/models/voltage_class'

export default class VoltageClassService {
  static async getVoltageClasses(filters: IQueryParams) {
    const { page, limit, order, sort} = filters
    const voltageClasses = await VoltageClass.query()
      .if(sort && order, (query) => query.orderBy(sort!, order))
      .paginate(page!, limit)

    return voltageClasses
  }

  static async create(data: INewVoltageClass): Promise<VoltageClass> {
    const voltageClass = await VoltageClass.create(data)

    return voltageClass
  }

  static async update(id: number, data: IUpdVoltageClass): Promise<VoltageClass> {
    const voltageClass = await VoltageClass.findOrFail(id)
    const updVoltageClass = await voltageClass.merge(data).save()

    return updVoltageClass
  }

  static async delete(id: number): Promise<void> {
    const voltageClass = await VoltageClass.findOrFail(id)

    await voltageClass.delete()

    return
  }
}
