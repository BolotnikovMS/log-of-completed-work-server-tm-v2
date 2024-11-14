import { BaseSchema } from '@adonisjs/lucid/schema'
import { DateTime } from 'luxon'

export default class extends BaseSchema {
  protected tableName = 'channel_categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 11).notNullable()
      table.string('name', 200).notNullable()
      table.string('short_name', 200).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          user_id: 1,
          name: 'ТМ основной канал',
          short_name: 'ТМ осн.',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        {
          user_id: 1,
          name: 'ТМ резервный канал',
          short_name: 'ТМ рез.',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        {
          user_id: 1,
          name: 'ТМ дополнительный канал',
          short_name: 'ТМ доп.',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        {
          user_id: 1,
          name: 'ДС основной канал',
          short_name: 'ДС осн.',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
        {
          user_id: 1,
          name: 'ДС резервный канал',
          short_name: 'ДС рез.',
          created_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
