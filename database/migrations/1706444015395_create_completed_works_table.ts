import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'completed_works'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 11).notNullable()
      table
        .integer('substation_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('substations')
      table
        .integer('work_producer_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('users')
      table.text('description').notNullable()
      table.string('note').nullable()
      table.dateTime('date_completion').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
