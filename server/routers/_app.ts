import {feedRouter} from './feed'
import {router} from '../trpc'
import {technologyRouter} from './technology'

export const appRouter = router({
  technology: technologyRouter,
  feed: feedRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
