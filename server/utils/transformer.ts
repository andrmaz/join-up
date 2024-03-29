import {DataTransformerOptions} from '@trpc/server'
//import devalue from 'devalue'
import superjson from 'superjson'

export const transformer: DataTransformerOptions = {
  serialize: payload => superjson.serialize(payload),
  deserialize: payload => superjson.deserialize(payload),
}
