import type {IAuthUser} from 'app/types/user'
import type {IProjectData} from 'app/types/project'
import type {IPositionData} from 'app/types/position'
import {SelectOptionsType} from 'app/types/form'
import {Level, Role, Technology} from './constants'

export type StatusResponseType = {
  status: number
  message: string
}

//* User
export type UserResponseType = {
  message: string
  status: number
  user: IAuthUser
}

//* Project
export type ProjectsResponseType = {
  message: string
  projects: IProjectData[]
  status: number
}

export type ProjectResponseType = {
  message: string
  project: IProjectData
  status: number
}

export type RemoveProjectResponseType = {
  message: string
  project: {id: number}
  status: number
}

//* Async
export type FetchProjectsResponseType = {
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  data: ProjectsResponseType | null
  error: string | null
}

//* Position
export type PositionsResponseType = {
  message: string
  positions: IPositionData[]
  status: number
}

export type PositionResponseType = {
  message: string
  position: IPositionData
  status: number
}

export type RemovePositionResponseType = {
  message: string
  position: {id: number}
  status: number
}

//* Options
export type TechnologiesResponseType = {
  message: string
  technologies: SelectOptionsType<Technology>[]
  status: number
}

export type LanguagesResponseType = {
  message: string
  languages: SelectOptionsType<Language>[]
  status: number
}

export type LevelsResponseType = {
  status: number
  message: string
  levels: SelectOptionsType<Level>[]
}

export type RolesResponseType = {
  status: number
  message: string
  roles: SelectOptionsType<Role>[]
}
