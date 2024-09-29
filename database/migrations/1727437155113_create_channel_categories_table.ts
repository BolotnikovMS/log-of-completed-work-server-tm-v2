import { BaseSchema } from '@adonisjs/lucid/schema'
import { DateTime } from 'luxon'

export default class extends BaseSchema {
  protected tableName = 'channel_categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 11).notNullable()
      table.string('name', 200).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          user_id: 1,
          name: 'Основной канал',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        {
          user_id: 1,
          name: 'Резервный канал',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        {
          user_id: 1,
          name: 'Дополнительный канал',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
