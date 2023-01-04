import {IAuthUser} from 'app/types/user'
import {faker} from '@faker-js/faker'

export const generateUsers = (
  length = 10
): Omit<IAuthUser, 'id' | 'technologies' | 'languages'>[] =>
  Array(length)
    .fill({})
    .map(() => ({
      email: faker.internet.email(),
      name: faker.internet.userName(),
      image: faker.internet.avatar(),
    }))
