import type {IProjectData} from 'app/types/project'
import type {IPositionData} from 'app/types/position'
import {SelectOptionsType} from 'app/types/form'

export type TechnologiesParamsType = {
  technologies: SelectOptionsType[]
}

export type TokenParamsType = {
  token: string
}

export type ProjectParamsType = {
  project: IProjectData
  positions: IPositionData[]
}
