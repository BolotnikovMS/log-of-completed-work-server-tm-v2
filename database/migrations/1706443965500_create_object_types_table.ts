import { BaseSchema } from '@adonisjs/lucid/schema'
import { DateTime } from 'luxon'

export default class extends BaseSchema {
  protected tableName = 'object_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 11).notNullable()
      table.string('name', 255).notNullable()
      table.string('short_name', 255).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          user_id: 1,
          name: 'Подстанция',
          short_name: 'ПС',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        {
          user_id: 1,
          name: 'УС',
          short_name: 'Узел связи',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        {
          user_id: 1,
          name: 'ТП',
          short_name: 'Трансформаторная подстанция',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
