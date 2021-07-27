import * as React from 'react'
import {AxiosInstance} from 'axios'

const FetchContext = React.createContext<
  {authAxios: AxiosInstance} | undefined
>(undefined)

export {FetchContext}
