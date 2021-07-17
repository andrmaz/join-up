import * as React from 'react'
import {addApplicationWithToken} from '@api/fetchWithToken'
import useSessionCookie from '@hooks/cookie/useSessionCookie'
import type {StatusResponseType} from 'app/types/response'

export default function useAddApplication(
  id: number,
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
): () => Promise<StatusResponseType> {
  const token = useSessionCookie()
  const handleConfirm = async (): Promise<StatusResponseType> => {
    try {
      const response = await addApplicationWithToken(id, token)
      const {data} = response
      if (response.status === 201) {
        setShowDialog(false)
        return Promise.resolve(data)
      }
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return handleConfirm
}
