import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 11)
        .nullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('users')
      table.string('url').nullable()             // URL запроса
      table.string('method', 10).nullable()          // HTTP метод
      table.integer('status_code').nullable()
      table.string('action', 20).notNullable()        // 'error', 'create', 'update'
      table.string('error_type').nullable()      // Код ошибки
      table.text('error_message').nullable()     // Сообщение ошибки
      table.string('model', 30).nullable()
      table.json('data').nullable()              // Данные до операции
      table.json('changes').nullable()           // Изменения (для update)
      table.string('ip_address', 15).nullable()      // IP адрес клиента
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
