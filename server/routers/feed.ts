import {publicProcedure, router} from '../trpc'

import {IApplicationData} from 'app/types/application'
import {IPositionData} from 'app/types/position'
import {IProjectData} from 'app/types/project'

const projects: IProjectData[] = []
const positions: IPositionData[] = []
const applications: IApplicationData[] = []

export const feedRouter = router({
  list: publicProcedure.query(async () => {
    return {projects, positions, applications}
  }),
})
