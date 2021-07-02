import type {IProjectData} from 'app/types/project'
import type {IPosistionData} from 'app/types/position'
import {SelectOptionsType} from 'app/types/form'

export type ProtectedParamsType = {
  token: string
}

export type SignUpParamsType = {
  technologies: SelectOptionsType[]
  languages: SelectOptionsType[]
}

export type SlugParamsType = {
  project: IProjectData
  positions: IPosistionData[]
}

export type ProjectParamsType = {
  token: string
  technologies: SelectOptionsType[]
}

export type ProjectsParamsType = {
  token: string
  options: SelectOptionsType[]
}
