import {publicProcedure, router} from '../trpc'

import {Role} from 'app/types/constants'
import {SelectOptionsType} from 'app/types/form'

const roles: SelectOptionsType<Role>[] = [
  {id: 1, label: Role.FE},
  {id: 2, label: Role.BE},
  {id: 3, label: Role.UX},
  {id: 4, label: Role.PM},
]

export const roleRouter = router({
  list: publicProcedure.query(async () => {
    return {roles}
  }),
})
