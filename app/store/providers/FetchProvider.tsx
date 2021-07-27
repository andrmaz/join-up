import axios from 'axios'
import {FetchContext} from '@context/fetchContext'
import router from 'next/router'

const FetchProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const authAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  })

  authAxios.interceptors.request.use(
    config => {
      config.withCredentials = true
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  authAxios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      const code = error && error.response ? error.response.status : 0
      if (code === 401) {
        console.log('error code', code)
        router.push('/signin')
        return
      }
      return Promise.reject(error)
    }
  )

  return (
    <FetchContext.Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </FetchContext.Provider>
  )
}

export {FetchContext, FetchProvider}
