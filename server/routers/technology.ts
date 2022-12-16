import {publicProcedure, router} from '../trpc'

import {SelectOptionsType} from 'app/types/form'
import {Technology} from 'app/types/constants'

const technologies: SelectOptionsType<Technology>[] = [
  {id: 1, label: Technology.JavaScript},
  {id: 2, label: Technology.TypeScript},
  {id: 3, label: Technology.Rust},
  {id: 4, label: Technology.Python},
]

export const technologyRouter = router({
  list: publicProcedure.query(async () => {
    return {technologies}
  }),
})
