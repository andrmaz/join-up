import useSessionCookie from '@hooks/cookie/useSessionCookie'
import {usePositionContext} from '@hooks/position/usePositionContext'
import useModalContext from '@hooks/modal/useModalContext'

import {deletePositionByIdWithToken} from '@api/fetchWithToken'
import type {RemovePositionResponseType} from 'app/types/response'

export default function useRemovePosition(
  id: number
): () => Promise<RemovePositionResponseType> {
  const token = useSessionCookie()
  const {dispatch} = usePositionContext()
  const {setIsOpen} = useModalContext()
  const handleConfirm = async (): Promise<RemovePositionResponseType> => {
    try {
      const response = await deletePositionByIdWithToken(token, id)
      if (response.status === 200) {
        setIsOpen(false)
        dispatch({type: 'remove', payload: response.data.position.id})
        return Promise.resolve(response.data)
      }
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return handleConfirm
}
