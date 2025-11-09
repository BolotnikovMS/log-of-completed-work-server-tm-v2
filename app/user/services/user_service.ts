import { IParams } from '#interfaces/params'
import { IQueryParams } from '#interfaces/query_params'
import User from '#user/models/user'
import { blockUserAccountValidator, changePasswordValidator, changeUserRole, registerValidator } from '#user/validators/index'
import { Request } from '@adonisjs/core/http'
import { ModelObject } from '@adonisjs/lucid/types/model'

export default class UserService {
  static async getUsers(req: Request): Promise<{ meta: any, data: ModelObject[] }> {
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

    return users.serialize()
  }

  static async getUserById(params: IParams): Promise<User> {
    const user = await User.findOrFail(params.id)

    await user.preload('role')

    return user
  }

  static async createUserAccount(req: Request): Promise<void> {
    const validatedData = await req.validateUsing(registerValidator)

    await User.create(validatedData)
  }

  static async changePassword(req: Request, userId: number): Promise<User | boolean> {
    const user = await User.findOrFail(userId)

    if (!user.active) return false

    const validatedData = await req.validateUsing(changePasswordValidator)

    return await user.merge(validatedData).save()
  }

  static async blockUserAccount(req: Request, params: IParams): Promise<void> {
    const user = await User.findOrFail(params.id)
    const validatedData = await req.validateUsing(blockUserAccountValidator)

    await user.merge(validatedData).save()
  }

  static async changeRole(req: Request, user: User): Promise<void> {
    const validatedData = await req.validateUsing(changeUserRole)

    await user.merge(validatedData).save()
  }
}
