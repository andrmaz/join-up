import {Level, Role} from 'app/types/constants'
import {protectedProcedure, router} from '../trpc'

import {PositionsResponseType} from 'app/types/response'
import {z} from 'zod'

const response: PositionsResponseType = {
  message: '',
  positions: [],
  status: 200,
}

export const positionRouter = router({
  list: protectedProcedure
    // using zod schema to validate and infer input values
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(() => {
      return {
        response,
      }
    }),

  create: protectedProcedure
    .input(
      z.object({
        projectId: z.number(),
        title: z.string(),
        qualifications: z.string(),
        duties: z.string(),
        technologies: z.object({id: z.number(), label: z.string()}).array(),
        vacancies: z.number(),
        level: z.string(),
        role: z.string(),
      })
    )
    .mutation(() => {
      return {
        message: 'Ok',
        position: {
          id: 0,
          title: '',
          qualifications: '',
          duties: '',
          technologies: [],
          vacancies: 0,
          level: {id: 0, label: Level.Mid},
          role: {id: 0, label: Role.FE},
          projectId: 0,
          userId: 0,
          applicants: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        status: 201,
      }
    }),

  remove: protectedProcedure
    .input(
      z.object({
        positionId: z.number(),
      })
    )
    .mutation(() => {
      return {
        message: 'Ok',
        position: {id: 0},
        status: 200,
      }
    }),

  edit: protectedProcedure
    .input(
      z.object({
        positionId: z.number(),
        projectId: z.number(),
        title: z.string().nullish(),
        qualifications: z.string().nullish(),
        duties: z.string().nullish(),
        technologies: z
          .object({id: z.number(), label: z.string()})
          .array()
          .nullish(),
        vacancies: z.number().nullish(),
        level: z.string().nullish(),
        role: z.string().nullish(),
      })
    )
    .mutation(() => {
      return {
        message: 'Ok',
        position: {
          id: 0,
          title: '',
          qualifications: '',
          duties: '',
          technologies: [],
          vacancies: 0,
          level: {id: 0, label: Level.Mid},
          role: {id: 0, label: Role.FE},
          projectId: 0,
          userId: 0,
          applicants: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        status: 200,
      }
    }),
})
