import type { CreateLogRecord } from '#log/interfaces/index'
import Log from '#log/models/log'
import type { QueryParamsLog } from '#log/types/index'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class LogService {
  static async getLogs(filters: QueryParamsLog): Promise<ModelPaginatorContract<Log>> {
    const { page, limit, action } = filters
    const logs = await Log.query()
      .if(action, query => query.where('action', '=', action!))
      .preload('user')
      .paginate(page!, limit)

    return logs
  }

  static async createRecord({ data, changes, ...props }: CreateLogRecord): Promise<Log> {
    const logRecord = await Log.create({
      data: JSON.stringify(data),
      changes: changes ? JSON.stringify(changes) : null,
      ...props
    })

    return logRecord
  }

  static async findById(id: number): Promise<Log> {
    const log = await Log.findOrFail(id)

    await log.load('user')

    return log
  }
}
