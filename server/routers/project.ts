import {protectedProcedure, router} from '../trpc'

import {IProjectData} from 'app/types/project'
import {ProjectResponseType} from 'app/types/response'
import {getProjectList} from 'server/controllers/projects'
import {z} from 'zod'

const project: IProjectData = {
  id: 0,
  name: 'Test',
  mission: 'Fake',
  description: 'First',
  technologies: [],
  userId: 0,
  collaborators: [],
  available: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
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
  list: protectedProcedure
    .input(
      z
        .object({
          date: z.enum(['asc', 'desc']),
          available: z.boolean(),
          technologies: z.number().array(),
          match: z.enum(['all', 'any']).optional(),
        })
        .default({
          date: 'asc',
          available: true,
          technologies: [],
        })
    )
    .query(async ({input}) => {
      const projects = await getProjectList(input)
      return {projects}
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        mission: z.string(),
        technologies: z.number().array(),
        projectURL: z.string().nullish(),
      })
    )
    .mutation(() => {
      return {
        message: 'Ok',
        project,
        status: 201,
      }
    }),

  remove: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
      })
    )
    .mutation(() => {
      return {
        message: 'Ok',
        project: {id: 0},
        status: 200,
      }
    }),

  edit: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
        name: z.string().nullish(),
        description: z.string().nullish(),
        mission: z.string().nullish(),
        technologies: z.number().array().nullish(),
        projectURL: z.string().nullish(),
      })
    )
    .mutation(() => {
      return {
        message: 'Ok',
        project,
        status: 200,
      }
    }),
})
