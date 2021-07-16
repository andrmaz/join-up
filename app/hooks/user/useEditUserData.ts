import * as React from 'react'
import axios from 'axios'

import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {edit} from '@actions/authActions'

import type {IUserContext} from 'app/types/user'
import type {EditUserResponseType} from 'app/types/response'

export default function useEditUserData(
  token: string
): readonly [
  boolean,
  string,
  () => void,
  (data: IUserContext) => Promise<IUserContext>
] {
  //* Toast Component Status
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const handleClose = (): void => {
    setIsSuccess(false)
    setSuccessMessage('')
  }
  const dispatch = useAuthDispatch()
  const onSubmit = async (data: IUserContext): Promise<IUserContext> => {
    try {
      const response = await axios.patch<EditUserResponseType>(
        '/user',
        {user: data},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const {user, message} = response.data
      edit(dispatch, user)
      setIsSuccess(true)
      setSuccessMessage(message)
      return Promise.resolve(user)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [isSuccess, successMessage, handleClose, onSubmit] //as const
}
