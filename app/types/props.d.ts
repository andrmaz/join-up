import type {SelectOptionsType} from 'app/types/form'
import type {IPositionData} from './position'
import type {IProjectData} from './project'

type RedirectPropsType = {
  props: Record<string, never>
  redirect: {destination: string; permanent: boolean}
}

export type TechnologiesPropsType = {
  props: {
    technologies: SelectOptionsType[]
  }
}

export type TokenPropsType = {props: {token: string}} | RedirectPropsType

export type ProjectPropsType =
  | {
      props: {
        project: IProjectData
        positions: IPositionData[]
      }
    }
  | RedirectPropsType
