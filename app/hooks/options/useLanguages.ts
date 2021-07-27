import * as React from 'react'
import axios, {Canceler} from 'axios'
import {publicFetch} from '@utils/fetch'
import type {SelectOptionsType} from 'app/types/form'
import type {LanguagesResponseType} from 'app/types/response'

export default function useLanguages(): SelectOptionsType[] {
  const [options, setOptions] = React.useState<SelectOptionsType[]>([])
  React.useEffect(() => {
    let cancel: Canceler
    ;(async () => {
      try {
        const response = await publicFetch.get<LanguagesResponseType>(
          '/language',
          {
            //* An executor function receives a cancel function as a parameter
            cancelToken: new axios.CancelToken(c => (cancel = c)),
          }
        )
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
  }, [])
  return options
}
