import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'channels'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 11).notNullable()
      table.integer('substation_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('substations')
      table.integer('channel_category_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('channel_categories')
      table.integer('channel_type_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('channel_types')
      table.integer('channel_equipment_id', 11)
        .nullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('channeling_equipments')
      table.integer('gsm_id', 11)
        .nullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('gsm_operators')
      table.string('ip_address').nullable()
      table.string('note', 700).nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
