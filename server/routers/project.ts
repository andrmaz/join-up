import {protectedProcedure, router} from '../trpc'

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
  detail: protectedProcedure.query(async () => {
    return {response}
  }),
  list: protectedProcedure.query(async () => {
    const projects = [project]
    return {projects}
  }),
})
