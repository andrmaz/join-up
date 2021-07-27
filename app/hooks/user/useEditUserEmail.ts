import * as React from 'react'

import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {useFetchContext} from '@hooks/fetch/useFetchContext'
import {edit} from '@actions/authActions'

import type {IEditEmail} from 'app/types/user'
import type {UserResponseType} from 'app/types/response'

export default function useEditUserEmail(): readonly [
  boolean,
  string,
  () => void,
  (data: IEditEmail) => Promise<UserResponseType>
] {
  const dispatch = useAuthDispatch()
  const fetchContext = useFetchContext()
  //* Toast Component Status
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const handleClose = (): void => {
    setIsSuccess(false)
    setSuccessMessage('')
  }
  const onSubmit = async (data: IEditEmail): Promise<UserResponseType> => {
    try {
      const response = await fetchContext.authAxios.patch<UserResponseType>(
        '/user/email',
        {
          user: data,
        }
      )
      if (response) {
        const {user, message} = response.data
        edit(dispatch, user)
        setIsSuccess(true)
        setSuccessMessage(message)
        return Promise.resolve(response.data)
      } else {
        return Promise.reject({message: 'Something went wrong'})
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [isSuccess, successMessage, handleClose, onSubmit] //as const
}
