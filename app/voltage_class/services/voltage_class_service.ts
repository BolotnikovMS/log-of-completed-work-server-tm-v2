import type { BaseQueryParams } from '#shared/interfaces/index'
import VoltageClass from '#voltage_class/models/voltage_class'
import type { CreateVoltageClass, UpdateVoltageClass } from '#voltage_class/types/voltage_class'

export default class VoltageClassService {
  static async getVoltageClasses(filters: BaseQueryParams) {
    const { page, limit, order, sort } = filters
    const voltageClasses = await VoltageClass.query()
      .if(sort && order, (query) => query.orderBy(sort!, order))
      .paginate(page!, limit)

    return voltageClasses
  }

  static async create(data: CreateVoltageClass): Promise<VoltageClass> {
    const voltageClass = await VoltageClass.create(data)

    return voltageClass
  }

  static async update(id: number, data: UpdateVoltageClass): Promise<VoltageClass> {
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
