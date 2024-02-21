import { RolesEnum } from '#enums/roles'
import hash from '@adonisjs/core/services/hash'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.boolean('active').defaultTo(true)
      table.string('username', 50).notNullable().unique()
      table.string('surname', 30).notNullable()
      table.string('name', 30).notNullable()
      table.string('patronymic', 30).notNullable()
      table.string('position', 50).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table
        .integer('role_id')
        .notNullable()
        .unsigned()
        .index()
        .references('id')
        .inTable('roles')
        .defaultTo(RolesEnum.USER)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.defer(async (db) => {
      await db.table(this.tableName).insert({
        username: 'Admin',
        surname: 'Admin',
        name: 'Admin',
        patronymic: 'Admin',
        position: 'Admin',
        role_id: RolesEnum.ADMIN,
        email: 'admin@worktm.ru',
        password: await hash.make('12345678'),
        created_at: Date.now(),
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
