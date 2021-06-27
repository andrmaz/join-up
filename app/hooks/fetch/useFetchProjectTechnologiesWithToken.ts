import * as React from 'react'
import axios, {Canceler} from 'axios'
import type {SelectOptions} from 'app/types/form'
import type {TechnologiesResponseType} from 'app/types/response'

export default function useFetchProjectTechnologiesWithToken(
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
