import {protectedProcedure, publicProcedure, router} from '../trpc'

import {TRPCError} from '@trpc/server'
import {z} from 'zod'

export const authRouter = router({
  signin: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ctx}) => {
      return {user: ctx.session?.user}
    }),
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
        technologies: z.number().array(),
        languages: z.number().array(),
      })
    )
    .mutation(async ({ctx}) => {
      return {user: ctx.session?.user}
    }),
  logout: publicProcedure.mutation(async () => {
    return {user: null}
  }),
  'verify-request': protectedProcedure.mutation(async ({ctx}) => {
    if (!ctx.session?.user.email) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      })
    }
  }),
})
