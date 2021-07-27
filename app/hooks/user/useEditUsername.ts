import * as React from 'react'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {edit} from '@actions/authActions'

import type {IEditUsername} from 'app/types/user'
import type {UserResponseType} from 'app/types/response'
import {useFetchContext} from '@hooks/fetch/useFetchContext'

export default function useEditUsername(): readonly [
  boolean,
  string,
  () => void,
  (data: IEditUsername) => Promise<UserResponseType>
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
  const onSubmit = async (data: IEditUsername): Promise<UserResponseType> => {
    try {
      const response = await fetchContext.authAxios.patch<UserResponseType>(
        '/user/username',
        {user: data}
      )
      if (response.status == 200) {
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
