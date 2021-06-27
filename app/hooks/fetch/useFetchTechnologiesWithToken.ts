import * as React from 'react'
import axios, {Canceler} from 'axios'
import type {SelectOptions} from 'app/types/form'
import type {TechnologiesResponseType} from 'app/types/response'

export default function useFetchTechnologiesWithToken(
  token: string
): SelectOptions[] {
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
