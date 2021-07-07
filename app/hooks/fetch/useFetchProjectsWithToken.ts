import * as React from 'react'
import useAsync from '@hooks/async/useAsync'
import {fetchProjectsWithToken} from '@api/fetchWithToken'
import type {NestedStringsType} from 'app/types/project'
import type {FetchProjectsResponseType} from 'app/types/response'

export default function useFetchProjectsWithToken(
  token: string,
  fields: {[x: string]: NestedStringsType}
): FetchProjectsResponseType {
  const {date, match, available, technologies} = fields
  const {isIdle, isLoading, isError, isSuccess, data, error, run} = useAsync()
  React.useEffect(() => {
    run(fetchProjectsWithToken(token, date, match, available, technologies))
  }, [available, date, match, run, technologies, token])
  return {
    isIdle,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
  }
}
