import type {IPositionData} from './position'
import type {IProjectData} from './project'

type RedirectPropsType = {
  props: Record<string, never>
  redirect: {destination: string; permanent: boolean}
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
