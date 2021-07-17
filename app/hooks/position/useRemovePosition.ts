import * as React from 'react'
import useSessionCookie from '@hooks/cookie/useSessionCookie'
import {usePositionContext} from '@hooks/position/usePositionContext'
import {deletePositionByIdWithToken} from '@api/fetchWithToken'
import type {RemovePositionResponseType} from 'app/types/response'

export default function useRemovePosition(
  id: number,
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
): () => Promise<RemovePositionResponseType> {
  const token = useSessionCookie()
  const {dispatch} = usePositionContext()
  const handleConfirm = async (): Promise<RemovePositionResponseType> => {
    try {
      const response = await deletePositionByIdWithToken(token, id)
      if (response.status === 200) {
        setShowDialog(false)
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
