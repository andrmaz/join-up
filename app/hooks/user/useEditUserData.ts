import * as React from 'react'
import {edit} from '@actions/authActions'

import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {useFetchContext} from '@hooks/fetch/useFetchContext'

import type {IAuthUser} from 'app/types/user'
import type {UserResponseType} from 'app/types/response'

export default function useEditUserData(): readonly [
  boolean,
  string,
  () => void,
  (data: IAuthUser) => Promise<UserResponseType>
] {
  const fetchContext = useFetchContext()
  //* Toast Component Status
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const handleClose = (): void => {
    setIsSuccess(false)
    setSuccessMessage('')
  }
  const dispatch = useAuthDispatch()
  const onSubmit = async (data: IAuthUser): Promise<UserResponseType> => {
    try {
      const response = await fetchContext.authAxios.patch<UserResponseType>(
        '/user',
        {user: data}
      )
      if (response.status === 200) {
        const {user, message} = response.data
        edit(dispatch, user)
        setIsSuccess(true)
        setSuccessMessage(message)
        return Promise.resolve(response.data)
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [isSuccess, successMessage, handleClose, onSubmit] //as const
}
