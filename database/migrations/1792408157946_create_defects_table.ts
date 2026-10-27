import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'defects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('users')
      table
        .integer('substation_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('substations')
      table.text('title')
        .notNullable()
      table.text('description')
        .notNullable()
      table.text('category')
        .notNullable()
        .checkIn(['Дефект', 'Замечание'])
        .defaultTo('Дефект')
      table.string('status', 20)
        .notNullable()
        .checkIn(['Открыт', 'Закрыт'])
        .defaultTo('Открыт')
      table.integer('user_id_resolved', 11)
        .nullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('users')
      table.text('resolution')
        .nullable()
      table.dateTime('resolved_at')
        .nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
