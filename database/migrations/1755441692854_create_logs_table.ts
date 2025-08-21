import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('users')
      table.string('action_type')
        .notNullable()
        .checkIn(['view', 'create', 'update', 'delete', 'login', 'logout'])
      table.string('entity_type', 30)
        .notNullable()
      table.integer('entity_id', 11)
        .nullable()
      table.string('user_ip_address', 15)
        .notNullable()
      table.text('additional_data')
        .nullable()
      table.string('status', 10)
        .notNullable()
        .checkIn(['success', 'failed'])
      table.text('error_message')
        .nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
