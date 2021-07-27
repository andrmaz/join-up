import * as React from 'react'
import {AxiosInstance} from 'axios'
import {FetchContext} from '@context/fetchContext'

export function useFetchContext(): {authAxios: AxiosInstance} {
  const context = React.useContext(FetchContext)
  if (!context) {
    throw new Error('useFetchContext must be used within a FetchProvider')
  }
  return context
}
