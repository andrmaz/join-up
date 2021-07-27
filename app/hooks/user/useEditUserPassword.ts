import * as React from 'react'
import {useFetchContext} from '@hooks/fetch/useFetchContext'

import type {IEditPassword} from 'app/types/user'
import type {StatusResponseType} from 'app/types/response'

export default function useEditUserPassword(): readonly [
  boolean,
  string,
  () => void,
  (data: IEditPassword) => Promise<StatusResponseType>
] {
  const fetchContext = useFetchContext()
  //* Toast Component Status
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const handleClose = (): void => {
    setIsSuccess(false)
    setSuccessMessage('')
  }
  const onSubmit = async (data: IEditPassword): Promise<StatusResponseType> => {
    try {
      const response = await fetchContext.authAxios.patch<StatusResponseType>(
        '/user/password',
        {
          user: data,
        }
      )
      if (response.status === 200) {
        setIsSuccess(true)
        setSuccessMessage(response.data.message)
        return Promise.resolve(response.data)
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [isSuccess, successMessage, handleClose, onSubmit] //as const
}
