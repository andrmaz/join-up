import {protectedProcedure, router} from '../trpc'

import {IProjectData} from 'app/types/project'
import {ProjectResponseType} from 'app/types/response'
import {z} from 'zod'

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
  list: protectedProcedure
    .input(
      z
        .object({
          date: z.string().optional(), // 'asc' | 'desc'
          match: z.string().optional(), // 'all' | 'any'
          technologies: z.number().array().optional(),
          position: z.boolean().optional(),
        })
        .nullish()
    )
    .query(async ({input}) => {
      input
      const projects = [project]
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
        project: {
          id: 0,
          name: '',
          description: '',
          mission: '',
          technologies: [],
          owner: 0,
          collaborators: [],
          hasPositions: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
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
        project: {
          id: 0,
          name: '',
          description: '',
          mission: '',
          technologies: [],
          owner: 0,
          collaborators: [],
          hasPositions: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        status: 200,
      }
    }),
})
