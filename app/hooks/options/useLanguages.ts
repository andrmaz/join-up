import * as React from 'react'

import axios, {Canceler} from 'axios'

import type {LanguagesResponseType} from 'app/types/response'
import type {SelectOptionsType} from 'app/types/form'
import {publicFetch} from '@utils/fetch'

export default function useLanguages(): readonly [SelectOptionsType[]] {
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
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error)
        } else {
          throw error
        }
      }
    })()
    //* cancel the request
    return () => cancel()
  }, [])
  return [options] as const
}
