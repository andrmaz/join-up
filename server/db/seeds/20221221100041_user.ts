import {IAuthUser} from 'app/types/user'
import {Knex} from 'knex'
import {generateUsers} from '../mocks/users'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.schema.dropTableIfExists('users')

  // Inserts seed entries
  await knex.schema.createTable('users', table => {
    table.increments()
    table.string('email')
    table.string('name')
    table.string('image')
    table.json('technologies').defaultTo([])
    table.json('languages').defaultTo([])
    table.timestamps(true, true)
  })
  await knex<IAuthUser>('users').insert(generateUsers()).returning('id')
}
