import type {IUserContext} from 'app/types/user'
import type {IPosistionData} from 'app/types/position'

export type TechnologiesResponseType = {
  message: string
  technologies: NestedOptions[]
  status: number
}

export type LanguagesResponseType = {
  message: string
  languages: NestedOptions[]
  status: number
}

export type ProjectsResponseType = {
  message: string
  projects: IProjectData[]
  status: number
}

export type PositionResponseType = {
  message: string
  position: IPosistionData
  status: number
}

export type EditEmailResponseType = {
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
