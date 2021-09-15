import * as React from 'react'

import axios, {Canceler} from 'axios'

import type {LevelsResponseType} from 'app/types/response'
import type {SelectOptionsType} from 'app/types/form'
import {publicFetch} from '@utils/fetch'

export default function useLevels(): SelectOptionsType[] | undefined {
  const [options, setOptions] = React.useState<SelectOptionsType[]>()
  //* Set levels options to State as soon as the modal is shown
  React.useEffect(() => {
    let cancel: Canceler
    ;(async () => {
      try {
        const response = await publicFetch.get<LevelsResponseType>('/level', {
          //* An executor function receives a cancel function as a parameter
          cancelToken: new axios.CancelToken(c => (cancel = c)),
        })
        const {levels, status, message} = response.data
        if (status === 200) {
          setOptions(levels)
          return Promise.resolve(message)
        }
        return response.data
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
  }, [])
  return options
}
