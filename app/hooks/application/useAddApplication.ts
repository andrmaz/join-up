import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useModalContext from '@hooks/modal/useModalContext'

import {addApplicationWithToken} from '@api/fetchWithToken'
import type {StatusResponseType} from 'app/types/response'

export default function useAddApplication(
  id: number
): () => Promise<StatusResponseType> {
  const token = useSessionCookie()
  const {setIsOpen} = useModalContext()
  const handleConfirm = async (): Promise<StatusResponseType> => {
    try {
      const response = await addApplicationWithToken(id, token)
      const {data} = response
      if (response.status === 201) {
        setIsOpen(false)
        return Promise.resolve(data)
      }
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return handleConfirm
}
