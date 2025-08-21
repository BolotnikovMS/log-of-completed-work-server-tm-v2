import { INewLogRecord, IQueryParamsLog } from '#domains/logs/interfaces/index'
import Log from '#models/log'
import { logParamsValidator } from '#validators/log'
import { Request } from '@adonisjs/core/http'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class LogService {
  static async getLogs(req: Request): Promise<ModelPaginatorContract<Log>> {
    const { page, limit = -1, status, action } = req.qs() as IQueryParamsLog

    await req.validateUsing(logParamsValidator, { meta: { status, action, page, limit } })

    const logs = await Log.query()
      .if(status, query => query.where('status', '=', status))
      .if(action, query => query.where('action_type', '=', action))
      .paginate(page, limit)

    return logs
  }

  static async createRecord({ data, changes, ...props }: INewLogRecord): Promise<Log> {
    const logRecord = await Log.create({
      data: JSON.stringify(data),
      changes: changes ? JSON.stringify(changes) : null,
      ...props
    })

    return logRecord
  }
}
