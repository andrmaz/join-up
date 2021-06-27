import * as React from 'react'
import axios, {Canceler} from 'axios'

import {useAsyncReducer} from '@hooks/async/useAsyncReducer'

import type {NestedStrings, AsyncState} from 'app/types/project'
import type {SelectOptions} from 'app/types/form'
import type {
  TechnologiesResponseType,
  LanguagesResponseType,
  ProjectsResponseType,
} from 'app/types/response'

export function useFetchTechnologiesWithToken(token: string): SelectOptions[] {
  const [options, setOptions] = React.useState<SelectOptions[]>([])
  React.useEffect(() => {
    let cancel: Canceler
    ;(async () => {
      try {
        const response = await axios.get<TechnologiesResponseType>(
          '/technology',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            //* An executor function receives a cancel function as a parameter
            cancelToken: new axios.CancelToken(c => (cancel = c)),
          }
        )
        const {technologies} = response.data
        setOptions(technologies)
        return Promise.resolve(technologies)
      } catch (thrown) {
        if (axios.isCancel(thrown)) {
          return thrown.message
        } else {
          return Promise.reject(thrown)
        }
      }
    })()
    //* cancel the request
    return () => cancel()
  }, [token])
  return options
}

export function useFetchLanguagesWithToken(token: string): SelectOptions[] {
  const [options, setOptions] = React.useState<SelectOptions[]>([])
  React.useEffect(() => {
    let cancel: Canceler
    ;(async () => {
      try {
        const response = await axios.get<LanguagesResponseType>('/language', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          //* An executor function receives a cancel function as a parameter
          cancelToken: new axios.CancelToken(c => (cancel = c)),
        })
        const {languages} = response.data
        setOptions(languages)
        return Promise.resolve(languages)
      } catch (thrown) {
        if (axios.isCancel(thrown)) {
          return thrown.message
        } else {
          return Promise.reject(thrown)
        }
      }
    })()
    //* cancel the request
    return () => cancel()
  }, [token])
  return options
}

export function useFetchProjectTechnologiesWithToken(
  token: string
): SelectOptions[] {
  const [options, setOptions] = React.useState<SelectOptions[]>([])
  //* Store id in useRef Hook
  const id = React.useRef<string | null>(null)
  React.useEffect(() => {
    //* You now have access to `window`
    id.current = window.location.pathname.slice(10)
    let cancel: Canceler
    ;(async () => {
      try {
        const {
          data: {technologies},
        } = await axios.get<TechnologiesResponseType>(
          `/technology/project/${id.current}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            //* An executor function receives a cancel function as a parameter
            cancelToken: new axios.CancelToken(c => (cancel = c)),
          }
        )
        setOptions(technologies)
      } catch (thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message)
          return thrown.message
        } else {
          Promise.reject(thrown)
        }
      }
    })()
    //* Cleanup
    return () => {
      //* cancel the request
      cancel()
      id.current = null
    }
  }, [token])
  return options
}

export function useFetchProjectsWithToken(
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
