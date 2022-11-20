import {publicProcedure, router} from '../trpc'

import {IProjectData} from 'app/types/project'
import {ProjectResponseType} from 'app/types/response'

const project: IProjectData = {
  id: 0,
  name: '',
  mission: '',
  description: '',
  technologies: [],
  owner: 0,
  collaborators: [],
  hasPositions: false,
  createdAt: '',
  updatedAt: '',
}
const response: ProjectResponseType = {
  message: '',
  status: 200,
  project,
}

export const projectRouter = router({
  detail: publicProcedure.query(async () => {
    return {response}
  }),
  list: publicProcedure.query(async () => {
    const projects = [project]
    return {projects}
  }),
})
