import {IProjectData} from 'app/types/project'

export type AsyncDataType = IProjectData[] | undefined

export type AsyncStateType = {
  status: string
  data: AsyncDataType
  error: string | null
}

export type AsyncActionsType =
  | {type: 'idle'}
  | {type: 'pending'}
  | {type: 'resolved'; payload: AsyncDataType}
  | {type: 'rejected'; payload: string}
