import type { BlockUserAccount, ChangeUserPassword, ChangeUserRole, CreateUser, UserQueryParams } from '#user/interfaces/index'
import User from '#user/models/user'

export default class UserService {
  static async getUsers(filters?: UserQueryParams) {
    // const { active, cleanUser, page, limit } = filters
    console.log(Boolean(filters?.active))
    const users = await User.query()
      .if(Boolean(filters?.active), (query) => query.where('active', '=', 1))
      .if(Boolean(filters?.cleanUser), (query) => {
        query.where((queryWhere) => {
          queryWhere.where('active', '=', 1)
          queryWhere.where('id', '!=', 1)
        })
      })
      .preload('role')
      .paginate(filters?.page!, filters?.limit)

    return users
  }

  static async findById(id: number): Promise<User> {
    const user = await User.findOrFail(id)

    await user.load('role')

    return user
  }

  static async createAccount(data: CreateUser): Promise<void> {
    await User.create(data)

    return
  }

  static async changePassword(id: number, data: ChangeUserPassword): Promise<User | boolean> {
    const user = await User.findOrFail(id)

    if (!user.active) return false

    return await user.merge(data).save()
  }

  static async blockAccount(id: number, data: BlockUserAccount): Promise<void> {
    const user = await User.findOrFail(id)

    await user.merge(data).save()

    return
  }

  static async changeRole(id: number, data: ChangeUserRole): Promise<void> {
    const user = await User.findOrFail(id)

    await user.merge(data).save()

    return
  }
}
