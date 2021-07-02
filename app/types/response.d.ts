import type {IUserContext} from 'app/types/user'
import type {IProjectData} from 'app/types/project'
import type {IPosistionData} from 'app/types/position'
import {SelectOptionsType} from 'app/types/form'

export type StatusResponseType = {
  status: number
  message: string
}

//* User
export type UserResponseType = {
  message: string
  status: number
  token: string
  user: IUserContext
}

export type EditUserResponseType = {
  status: number
  message: string
  user: IUserContext
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
  project: {id: string}
  status: number
}

//* Position
export type PositionsResponseType = {
  message: string
  positions: IPosistionData[]
  status: number
}

export type PositionResponseType = {
  message: string
  position: IPosistionData
  status: number
}

export type RemovePositionResponseType = {
  message: string
  position: {id: string}
  status: number
}

//* Options
export type TechnologiesResponseType = {
  message: string
  technologies: SelectOptionsType[]
  status: number
}

export type LanguagesResponseType = {
  message: string
  languages: SelectOptionsType[]
  status: number
}
