import { IQueryParams } from '#interfaces/query_params'
import User from '#models/user'
import { changePasswordValidator } from '#validators/change_password'
import { Request } from '@adonisjs/core/http'

export default class UserService {
  static async getUsers(req: Request): Promise<User[]> {
    const { active, cleanUser, page, limit } = req.qs() as IQueryParams
    const users = await User.query()
      .if(Boolean(active), (query) => query.where('active', '=', 1))
      .if(Boolean(cleanUser), (query) => {
        query.where((queryWhere) => {
          queryWhere.where('active', '=', 1)
          queryWhere.where('id', '!=', 1)
        })
      })
      .preload('role')
      .paginate(page, limit)

    return users
  }
  static async changePassword(req: Request, userId: number): Promise<User | boolean> {
    const user = await User.findOrFail(userId)

    if (!user.active) return false

    const validatedData = await req.validateUsing(changePasswordValidator)

    return await user.merge(validatedData).save()
  }
}
