import {IProjectData} from 'app/types/project'

export type AsyncDataType = IProjectData[] | undefined

export type AsyncStatusType = 'idle' | 'pending' | 'resolved' | 'rejected'

export type AsyncStateType = {
  status: AsyncStatusType
  data: AsyncDataType
  error: string | null
}

export type AsyncActionsType =
  | {type: 'idle'}
  | {type: 'pending'}
  | {type: 'resolved'; payload: AsyncDataType}
  | {type: 'rejected'; payload: string}
