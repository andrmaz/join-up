import type {Knex} from 'knex'
import {NodeEnv} from '../utils/constants'

const config: Record<typeof NodeEnv, Knex.Config> = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      password: 'secret',
      user: 'postgres',
      db: 'postgres',
    },
    searchPath: ['knex', 'public'],
    debug: true,
    asyncStackTraces: true,
    migrations: {
      tableName: 'migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './seeds',
      extension: 'ts',
      loadExtensions: ['.ts'],
      timestampFilenamePrefix: true,
    },
  },

  test: {
    client: 'postgresql',
    connection: {},
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {},
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}

export default config
