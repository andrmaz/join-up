import * as React from 'react'
import axios from 'axios'
import type {StatusResponseType} from 'app/types/response'

export default function useAddApplication(
  token: string,
  id: number,
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
): [
  boolean,
  string,
  React.Dispatch<React.SetStateAction<boolean>>,
  () => Promise<StatusResponseType>
] {
  //* Toast Component Status
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const [successMessage, setSuccessMessage] = React.useState<string>('')
  const handleConfirm = async (): Promise<StatusResponseType> => {
    try {
      const response = await axios.post<StatusResponseType>(
        '/application',
        {
          position: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const {data} = response
      if (response.status === 201) {
        setIsSuccess(true)
        setSuccessMessage(data.message)
        setShowDialog(false)
        return Promise.resolve(data)
      }
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [isSuccess, successMessage, setIsSuccess, handleConfirm]
}
