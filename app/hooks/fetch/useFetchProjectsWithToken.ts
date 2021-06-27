import * as React from 'react'
import axios, {Canceler} from 'axios'
import {useAsyncReducer} from '@hooks/async/useAsyncReducer'
import type {NestedStrings, AsyncState} from 'app/types/project'
import type {ProjectsResponseType} from 'app/types/response'

export default function useFetchProjectsWithToken(
  token: string,
  fields: {[x: string]: NestedStrings}
): readonly [AsyncState, NestedStrings] {
  const [state, dispatch] = useAsyncReducer()
  const {date, match, available, technologies} = fields
  const fetchProjectsWithToken = React.useCallback(async () => {
    let cancel: Canceler
    try {
      //* technologies and match must be checked before each fetching
      const tech =
        technologies && technologies.length
          ? `&technologies=${technologies.toString()},`
          : ''
      const matchs = match ? `&match=${match}` : ''
      dispatch({type: 'pending'})
      const response = await axios.get<ProjectsResponseType>(
        `/project?sort=${date}${matchs}&hasPositions=${available}${tech}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: new axios.CancelToken(c => (cancel = c)),
        }
      )
      dispatch({type: 'resolved', payload: response.data.projects})
    } catch (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message)
        return thrown.message
      } else {
        dispatch({type: 'rejected', payload: thrown.message})
        Promise.reject(thrown)
      }
    }
    //* cancel the request
    return () => cancel()
  }, [technologies, match, dispatch, date, available, token])
  React.useEffect(() => {
    fetchProjectsWithToken()
  }, [fetchProjectsWithToken])
  return [state, technologies]
}
