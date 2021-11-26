import * as React from 'react'

import type {
  FetchProjectsResponseType,
  ProjectsResponseType,
} from 'app/types/response'

import type {AsyncStateType} from 'app/types/async'
import {AxiosResponse} from 'axios'
import {FieldValues} from 'app/types/components'
import useAsync from '@hooks/async/useAsync'
import {useFetchContext} from '@hooks/fetch/useFetchContext'

export default function useProjects(
  fields: FieldValues,
  initialState?: AsyncStateType<ProjectsResponseType>
): FetchProjectsResponseType {
  const {date, match, available, technologies} = fields
  const {isIdle, isLoading, isError, isSuccess, data, error, run} =
    useAsync(initialState)
  const fetchContext = useFetchContext()
  const getProjects = React.useCallback(async (): Promise<
    AxiosResponse<ProjectsResponseType>
  > => {
    //* technologies and match must be checked before each fetching
    const tech = technologies?.length
      ? `&technologies=${technologies.toString()},`
      : ''
    const matches = match ? `&match=${match}` : ''
    const response = await fetchContext.authAxios.get<ProjectsResponseType>(
      `/project?sort=${date}${matches}&hasPositions=${available}${tech}`
    )
    return response
  }, [available, date, fetchContext.authAxios, match, technologies])
  React.useEffect(() => {
    run(getProjects())
  }, [getProjects, run])
  return {
    isIdle,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
  }
}
