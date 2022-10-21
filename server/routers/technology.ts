import {publicProcedure, router} from '../trpc'

import {SelectOptionsType} from 'app/types/form'

const technologies: SelectOptionsType[] = [
  {id: 1, label: 'JavaScript'},
  {id: 2, label: 'TypeScript'},
  {id: 3, label: 'Rust'},
]

export const technologyRouter = router({
  list: publicProcedure.query(async () => {
    return {technologies}
  }),
})
