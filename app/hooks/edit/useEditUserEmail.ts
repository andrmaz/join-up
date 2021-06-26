import * as React from 'react'
import axios, {AxiosResponse} from 'axios'

import {useCookies} from 'react-cookie'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'

import {edit} from '@actions/authActions'

import type {IEditEmail} from 'app/types/edit'
import type {EditUserResponseType} from 'app/types/response'
import type {IUserContext} from 'app/types/user'

export default function useEditUserEmail(
  token: string
): readonly [
  boolean,
  string,
  () => void,
  (data: IEditEmail) => Promise<IUserContext>
] {
  const dispatch = useAuthDispatch()
  //* Toast Component Status
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const handleClose = (): void => {
    setIsSuccess(false)
    setSuccessMessage('')
  }
  const [, setCookie] = useCookies(['session'])
  const onSubmit = async (data: IEditEmail): Promise<IUserContext> => {
    try {
      const response: AxiosResponse<EditUserResponseType> = await axios.patch(
        '/user/email',
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
