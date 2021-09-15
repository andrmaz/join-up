import * as React from 'react'

import axios, {Canceler} from 'axios'

import type {SelectOptionsType} from 'app/types/form'
import type {TechnologiesResponseType} from 'app/types/response'
import {publicFetch} from '@utils/fetch'

export default function useTechnologies(id?: number): SelectOptionsType[] {
  const endpoint: string = id ? `/project/${id}` : ''
  const [options, setOptions] = React.useState<SelectOptionsType[]>([])
  React.useEffect(() => {
    let cancel: Canceler
    ;(async () => {
      try {
        const response = await publicFetch.get<TechnologiesResponseType>(
          `/technology${endpoint}`,
          {
            //* An executor function receives a cancel function as a parameter
            cancelToken: new axios.CancelToken(c => (cancel = c)),
          }
        )
        const {technologies} = response.data
        setOptions(technologies)
        return Promise.resolve(technologies)
      } catch (thrown: any) {
        if (axios.isCancel(thrown)) {
          return thrown.message
        } else {
          return Promise.reject(thrown)
        }
      }
    })()
    //* cancel the request
    return () => cancel()
  }, [endpoint])
  return options
}
