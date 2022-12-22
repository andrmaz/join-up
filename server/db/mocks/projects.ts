import {IProjectData} from 'app/types/project'
import {faker} from '@faker-js/faker'

export const generateProjects = (
  length = 10
): Omit<
  IProjectData,
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'userId'
  | 'technologies'
  | 'collaborators'
  | 'available'
>[] =>
  Array(length)
    .fill({})
    .map(() => ({
      name: faker.lorem.word(),
      mission: faker.lorem.slug(),
      description: faker.lorem.sentence(),
    }))
