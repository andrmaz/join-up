//import * as trpcNext from '@trpc/server/adapters/next'

//import {getSession} from 'next-auth/react'
import {inferAsyncReturnType} from '@trpc/server'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export async function createContext(/* _opts: trpcNext.CreateNextContextOptions */) {
  //const session = await getSession({req: opts.req})

  return {
    session: {user: {email: ''}},
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
