import { IQueryParams } from '#interfaces/query_params'
import User from '#models/user'
import { changePasswordValidator } from '#validators/change_password'
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
  static async getClearUsers(req: Request): Promise<User[]> { }
  static async changePassword(req: Request, userId: number): Promise<User> {
    const user = await User.findOrFail(userId)
    const validatedData = await req.validateUsing(changePasswordValidator)

    return await user.merge(validatedData).save()
  }
}
