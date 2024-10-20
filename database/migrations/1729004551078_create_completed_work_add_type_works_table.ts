import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'completed_works'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('type_work_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('type_works')
        .defaultTo(1)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('type_work_id')
    })
  }
}
