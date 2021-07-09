import type {SelectOptionsType} from 'app/types/form'
import type {IPositionData} from './position'
import type {IProjectData} from './project'

type RedirectPropsType = {
  props: Record<string, never>
  redirect: {destination: string; permanent: boolean}
}

export type TechnologiesAndLanguagesPropsType = {
  technologies: SelectOptionsType[]
  languages: SelectOptionsType[]
}

export type SessionTokenPropsType = {token: string}

export type ProjectAndPositionsPropsType = {
  project: IProjectData
  positions: IPositionData[]
}

export type TokenAndOptionsPropsType = {
  token: string
  options: SelectOptionsType[]
}

export type TokenAndTechnologiesPropsType = {
  token: string
  technologies: SelectOptionsType[]
}

export type SessionType<T> = {props: T} | RedirectPropsType
