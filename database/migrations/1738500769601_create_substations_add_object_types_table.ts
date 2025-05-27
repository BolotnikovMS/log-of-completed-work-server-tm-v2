import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'substations'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('object_type_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('object_types')
        .defaultTo(1)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('object_type_id')
    })
  }
}
