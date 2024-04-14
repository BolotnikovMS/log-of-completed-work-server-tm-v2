import { IQueryParams } from '#interfaces/query_params'
import User from '#models/user'
import { Request } from '@adonisjs/core/http'

export default class UserService {
  static async getUsers(req: Request): Promise<User[]> {
    const { active, page, limit } = req.qs() as IQueryParams
    const users = await User.query()
      .if(active, (query) => query.where('active', active))
      .preload('role')
      .paginate(page, limit)

    return users
  }
}
