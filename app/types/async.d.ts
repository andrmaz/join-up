export enum Status {
  idle = 'idle',
  pending = 'pending',
  resolved = 'resolved',
  rejected = 'rejected',
}

export type AsyncStateType<T> = {
  status: keyof typeof Status
  data: T | null
  error: string | null
}

export type AsyncActionsType<T> =
  | {type: Status.idle}
  | {type: Status.pending}
  | {type: Status.resolved; payload: T}
  | {type: Status.rejected; payload: string}

export type AsyncResponseType<T> = {
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  data: T | null
  error: string | null
  run: (promise: Promise) => unknown
}
