import { BaseSchema } from '@adonisjs/lucid/schema'
import { DateTime } from 'luxon'

export default class extends BaseSchema {
  protected tableName = 'type_works'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('users')
      table.string('name', 250).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          user_id: 1,
          name: 'Плановые работы',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        {
          user_id: 1,
          name: 'Внеплановые работы',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        {
          user_id: 1,
          name: 'Аварийные работы',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        {
          user_id: 1,
          name: 'Инвестиционная программа',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
