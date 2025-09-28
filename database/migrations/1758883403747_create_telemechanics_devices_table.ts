import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'telemechanics_devices'

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
      table
        .integer('type_kp_id', 11)
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
      table.text('note').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
