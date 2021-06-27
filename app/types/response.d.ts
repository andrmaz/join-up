import type {IUserContext} from 'app/types/user'
import type {IProjectData} from 'app/types/project'
import type {IPosistionData} from 'app/types/position'
import {SelectOptions} from 'app/types/form'

export type TechnologiesResponseType = {
  message: string
  technologies: SelectOptions[]
  status: number
}

export type LanguagesResponseType = {
  message: string
  languages: SelectOptions[]
  status: number
}

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

export type EditTokenResponseType = {
  user: IUserContext
  token: string
  message: string
  status: number
}

export type EditPasswordResponseType = {
  status: number
  message: string
}

export type EditUserResponseType = {
  status: number
  message: string
  user: IUserContext
}
