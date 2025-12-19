import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'head_controllers'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('actual_firmware_version', 150).nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('actual_firmware_version')
    })
  }
}
