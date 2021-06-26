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

export type EditUserResponseType = {
  user: IUserContext
  token: string
  message: string
}

export type EditPasswordResponseType = {
  status: number
  message: string
}
