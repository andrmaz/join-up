import * as React from 'react'
import axios, {AxiosResponse} from 'axios'

import type {IEditPassword} from 'app/types/edit'
import type {StatusResponseType} from 'app/types/response'

export default function useEditUserPassword(
  token: string
): readonly [
  boolean,
  string,
  () => void,
  (data: IEditPassword) => Promise<StatusResponseType>
] {
  //* Toast Component Status
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const handleClose = (): void => {
    setIsSuccess(false)
    setSuccessMessage('')
  }
  const onSubmit = async (data: IEditPassword): Promise<StatusResponseType> => {
    try {
      const response: AxiosResponse<StatusResponseType> = await axios.patch(
        '/user/password',
        {user: data},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        setIsSuccess(true)
        setSuccessMessage(response.data.message)
      }
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [isSuccess, successMessage, handleClose, onSubmit] //as const
}
