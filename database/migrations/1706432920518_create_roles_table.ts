import { RolesEnum } from '#shared/enums/roles'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          id: RolesEnum.USER,
          name: 'User',
        },
        {
          id: RolesEnum.MODERATOR,
          name: 'Moderator',
        },
        {
          id: RolesEnum.ADMIN,
          name: 'Admin',
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
