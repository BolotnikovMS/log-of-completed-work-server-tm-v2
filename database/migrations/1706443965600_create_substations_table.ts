import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'substations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('district_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('districts')
      table
        .integer('voltage_classes_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('voltage_classes')
      table
        .integer('type_kp_id')
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('type_kps')
      table
        .integer('head_controller_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('head_controllers')
      table
        .integer('main_channel_id', 11)
        .notNullable()
        .index()
        .unsigned()
        .references('id')
        .inTable('channel_types')
      table
        .integer('backup_channel_id', 11)
        .index()
        .unsigned()
        .references('id')
        .inTable('channel_types')
      table
        .integer('additional_channel_id', 11)
        .index()
        .unsigned()
        .references('id')
        .inTable('channel_types')
      table.integer('gsm_id', 11).index().unsigned().references('id').inTable('gsm_operators')
      table.boolean('active').defaultTo(true)
      table.string('name', 250).notNullable()
      table.string('slug', 250)
      table.boolean('rdu').defaultTo(false)
      table.string('main_channel_ip').nullable()
      table.string('backup_channel_ip').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
