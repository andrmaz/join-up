import {feedRouter} from './feed'
import {positionRouter} from './position'
import {projectRouter} from './project'
import {router} from '../trpc'
import {technologyRouter} from './technology'

export const appRouter = router({
  feed: feedRouter,
  position: positionRouter,
  project: projectRouter,
  technology: technologyRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
