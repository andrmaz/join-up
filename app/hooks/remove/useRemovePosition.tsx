import * as React from 'react'
import {deletePositionByIdWithToken} from '@api/fetchWithToken'
import {usePositionContext} from '@hooks/position/usePositionContext'
import type {RemovePositionResponseType} from 'app/types/response'

export default function useRemovePosition(
  token: string,
  uid: string,
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
): () => Promise<RemovePositionResponseType> {
  const {dispatch} = usePositionContext()
  const handleConfirm = async (): Promise<RemovePositionResponseType> => {
    try {
      const response = await deletePositionByIdWithToken(token, uid)
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
