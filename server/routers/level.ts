import {publicProcedure, router} from '../trpc'

import {Level} from 'app/types/constants'
import {SelectOptionsType} from 'app/types/form'

const levels: SelectOptionsType<Level>[] = [
  {id: 1, label: Level.Junior},
  {id: 2, label: Level.Mid},
  {id: 3, label: Level.Senior},
  {id: 4, label: Level.Lead},
]

export const levelRouter = router({
  list: publicProcedure.query(async () => {
    return {levels}
  }),
})
