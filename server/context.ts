import * as trpcNext from '@trpc/server/adapters/next'

import {getSession} from 'next-auth/react'
import {inferAsyncReturnType} from '@trpc/server'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const session = await getSession(opts)

  return {session}
}

export type Context = inferAsyncReturnType<typeof createContext>
