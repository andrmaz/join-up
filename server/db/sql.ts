import {NodeEnv} from '../utils/constants'
import config from './knexfile'
import {knex} from 'knex'

const pg = knex(config[NodeEnv])

export default pg
