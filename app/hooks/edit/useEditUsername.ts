import * as React from 'react'
import axios from 'axios'

import {useCookies} from 'react-cookie'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {edit} from '@actions/authActions'

import type {IEditUsername} from 'app/types/edit'
import type {IUserContext} from 'app/types/user'
import type {EditTokenResponseType} from 'app/types/response'

export default function useEditUsername(
  token: string
): readonly [
  boolean,
  string,
  () => void,
  (data: IEditUsername) => Promise<IUserContext>
] {
  const dispatch = useAuthDispatch()
  const [, setCookie] = useCookies(['session'])
  //* Toast Component Status
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const handleClose = (): void => {
    setIsSuccess(false)
    setSuccessMessage('')
  }
  const onSubmit = async (data: IEditUsername): Promise<IUserContext> => {
    try {
      const response = await axios.patch<EditTokenResponseType>(
        '/user/username',
        {user: data},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const {user, token: newToken, message} = response.data
      edit(dispatch, user)
      setCookie('session', newToken, {
        path: '/',
        // ? expiration date
        //maxAge: 3600, // Expires after 1hr
        sameSite: true,
        //httpOnly: true,
        //secure: true,
      })
      setIsSuccess(true)
      setSuccessMessage(message)
      return Promise.resolve(user)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [isSuccess, successMessage, handleClose, onSubmit] //as const
}
