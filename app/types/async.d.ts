export type AsyncStatusType = 'idle' | 'pending' | 'resolved' | 'rejected'

export type AsyncStateType<T> = {
  status: AsyncStatusType
  data: T | null
  error: string | null
}

export type AsyncActionsType<T> =
  | {type: 'idle'}
  | {type: 'pending'}
  | {type: 'resolved'; payload: T}
  | {type: 'rejected'; payload: string}

export type AsyncResponseType<T> = {
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  data: T | null
  error: string | null
  run: (promise: any) => any
}
