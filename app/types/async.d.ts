import {IProjectData} from 'app/types/project'

export type AsyncData = IProjectData[] | undefined

export type AsyncState = {
  status: string
  data: AsyncData
  error: string | null
}

export type AsyncActions =
  | {type: 'idle'}
  | {type: 'pending'}
  | {type: 'resolved'; payload: AsyncData}
  | {type: 'rejected'; payload: string}
