import {/* TRPCError, */ initTRPC} from '@trpc/server'

import {Context} from './context'
import {transformer} from './utils/transformer'

// Avoid exporting the entire t-object since it's not very
// descriptive and can be confusing to newcomers used to t
// meaning translation in i18n libraries.
const t = initTRPC.context<Context>().create({
  transformer,
})

// Base router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure

/**
 * Reusable middleware that checks if users are authenticated.
 * @note Example only, yours may vary depending on how your auth is setup
 **/
const isAuth = t.middleware(async ({next, ctx}) => {
  //TODO
  /* if (!ctx.session?.user?.email) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  } */
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.session,
    },
  })
})

// Protected procedures for logged in users only
export const protectedProcedure = t.procedure.use(isAuth)
