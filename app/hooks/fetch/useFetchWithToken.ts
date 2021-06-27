import * as React from 'react'
import axios, {Canceler} from 'axios'
import type {SelectOptions} from 'app/types/form'
import {
  TechnologiesResponseType,
  LanguagesResponseType,
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

export function useFetchPositionTechnologiesWithToken(
  token: string
): SelectOptions[] {
  const [options, setOptions] = React.useState<SelectOptions[]>([])
  //* Store project id in useRef Hook
  const uid = React.useRef<string | null>(null)
  React.useEffect(() => {
    //* You now have access to `window`
    uid.current = window.location.pathname.slice(10)
    let cancel: Canceler
    ;(async () => {
      try {
        const {
          data: {technologies},
        } = await axios.get<TechnologiesResponseType>(
          `/technology/project/${uid.current}`,
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
      uid.current = null
    }
  }, [token])
  return options
}
