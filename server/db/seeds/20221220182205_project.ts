import {IProjectData} from 'app/types/project'
import {Knex} from 'knex'
import {generateProjects} from '../mocks/projects'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.schema.dropTableIfExists('projects')

  // Inserts seed entries
  await knex.schema.createTable('projects', table => {
    table.increments()
    table.string('name')
    table.string('mission')
    table.string('description')
    table.json('technologies').defaultTo([])
    table.json('collaborators').defaultTo([])
    table.boolean('available').defaultTo(false)
    table.timestamps(true, true)
  })
  await knex<IProjectData>('projects')
    .insert(generateProjects())
    .returning('id')
}
