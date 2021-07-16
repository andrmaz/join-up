import type {IProjectData} from 'app/types/project'
import type {IPositionData} from 'app/types/position'

export type TokenParamsType = {
  token: string
}

export type ProjectParamsType = {
  project: IProjectData
  positions: IPositionData[]
}
