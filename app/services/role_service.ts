import Role from '#models/role'

export default class RoleService {
  static async getRoles(): Promise<Role[]> {
    const roles = await Role.query()

    return roles
  }
}
