import * as React from 'react'
import {AxiosResponse} from 'axios'
import {useAsyncReducer} from '@hooks/async/useAsyncReducer'
import type {AsyncStateType, AsyncResponseType} from 'app/types/async'
import type {ProjectsResponseType} from 'app/types/response'
import {Status} from 'app/types/constants'

export default function useAsync(
  init?: AsyncStateType<ProjectsResponseType>
): AsyncResponseType<ProjectsResponseType> {
  const [{status, data, error}, dispatch] = useAsyncReducer(init)
  const run = React.useCallback(
    (promise: Promise<any>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        )
      }
      dispatch({type: Status.pending})
      return promise
        .then((response: AxiosResponse) => {
          dispatch({type: Status.resolved, payload: response.data})
        })
        .catch((error: string) => {
          dispatch({type: Status.rejected, payload: error})
          return Promise.reject(error)
        })
    },
    [dispatch]
  )
  return {
    isIdle: status === Status.idle,
    isLoading: status === Status.pending,
    isError: status === Status.rejected,
    isSuccess: status === Status.resolved,
    data,
    error,
    run,
  }
}
