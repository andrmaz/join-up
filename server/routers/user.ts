import {protectedProcedure, publicProcedure, router} from '../trpc'

import {IAuthUser} from 'app/types/user'
import {z} from 'zod'

const user: IAuthUser = {
  id: 0,
  username: '',
  email: '',
  avatar: '',
  languages: [],
  technologies: [],
}

export const userRouter = router({
  detail: protectedProcedure.query(async () => {
    return {user}
  }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async () => {
      return {user}
    }),
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async () => {
      return {user}
    }),
  logout: publicProcedure.mutation(async () => {
    return {}
  }),
})
