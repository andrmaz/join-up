import type {IProjectData} from 'app/types/project'
import type {IPositionData} from 'app/types/position'
import {SelectOptionsType} from 'app/types/form'

export type SignUpParamsType = {
  technologies: SelectOptionsType[]
  languages: SelectOptionsType[]
}

export type SessionTokenParamType = {
  token: string
}

export type SlugParamsType = {
  project: IProjectData
  positions: IPositionData[]
}

export type ProjectParamsType = {
  token: string
  technologies: SelectOptionsType[]
}

export type ProjectsParamsType = {
  token: string
  options: SelectOptionsType[]
}
