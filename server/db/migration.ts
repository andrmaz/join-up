import {Knex} from 'knex'

/**
 * Same as the CommonJS version, the migration file should export
 * "up" and "down" named functions
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function up(_knex: Knex): void {
  // ... migration logic here
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function down(_knex: Knex): void {
  // ... migration logic here
}
