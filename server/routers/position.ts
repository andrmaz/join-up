import {publicProcedure, router} from '../trpc'

import {PositionsResponseType} from 'app/types/response'
import {z} from 'zod'

const response: PositionsResponseType = {
  message: '',
  positions: [],
  status: 200,
}

export const positionRouter = router({
  detail: publicProcedure
    // using zod schema to validate and infer input values
    .input(
      z
        .object({
          id: z.string(),
        })
        .nullish()
    )
    .query(() => {
      return {
        response,
      }
    }),
})
