import {applicationRouter} from './application'
import {feedRouter} from './feed'
import {languageRouter} from './language'
import {levelRouter} from './level'
import {positionRouter} from './position'
import {projectRouter} from './project'
import {roleRouter} from './role'
import {router} from '../trpc'
import {technologyRouter} from './technology'
import {userRouter} from './user'

export const appRouter = router({
  feed: feedRouter,
  position: positionRouter,
  project: projectRouter,
  technology: technologyRouter,
  language: languageRouter,
  level: levelRouter,
  role: roleRouter,
  user: userRouter,
  application: applicationRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
