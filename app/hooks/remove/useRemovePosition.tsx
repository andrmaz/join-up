import * as React from 'react'
import {deletePositionByIdWithToken} from '@api/fetchWithToken'
import type {PositionActions} from 'app/types/position'
import type {RemovePositionResponseType} from 'app/types/response'

export default function useRemovePosition(
  token: string,
  uid: string,
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: React.Dispatch<PositionActions>
): () => Promise<RemovePositionResponseType> {
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
