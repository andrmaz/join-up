import {protectedProcedure, router} from '../trpc'

import {z} from 'zod'

export const applicationRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(() => {
      return {
        message: 'Ok',
        status: 201,
      }
    }),

  remove: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(() => {
      return {
        message: 'Ok',
        project: {id: 0},
        status: 200,
      }
    }),
})
