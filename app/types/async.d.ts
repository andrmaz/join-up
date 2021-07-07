import type {ProjectsResponseType} from 'app/types/response'

export type AsyncStatusType = 'idle' | 'pending' | 'resolved' | 'rejected'

export type AsyncStateType = {
  status: AsyncStatusType
  data: ProjectsResponseType | null
  error: string | null
}

export type AsyncActionsType =
  | {type: 'idle'}
  | {type: 'pending'}
  | {type: 'resolved'; payload: ProjectsResponseType}
  | {type: 'rejected'; payload: string}

export type AsyncResponseType = {
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  data: ProjectsResponseType | null
  error: string | null
  run: (promise: any) => any
}
