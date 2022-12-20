import {protectedProcedure, router} from '../trpc'

import {IAuthUser} from 'app/types/user'
import {z} from 'zod'

const user: IAuthUser = {
  id: '0',
  name: '',
  email: '',
  image: '',
  languages: [],
  technologies: [],
}

export const userRouter = router({
  detail: protectedProcedure.query(async () => {
    return {user}
  }),

  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().nullish(),
        email: z.string().nullish(),
        avatar: z.string().nullish(),
        languages: z
          .object({id: z.number(), label: z.string()})
          .array()
          .nullish(),
        technologies: z
          .object({id: z.number(), label: z.string()})
          .array()
          .nullish(),
      })
    )
    .mutation(async () => {
      return {message: 'Ok', user, status: 200}
    }),
})
