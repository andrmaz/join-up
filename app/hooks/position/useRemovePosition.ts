import {PAction} from 'app/types/constants'
import type {RemovePositionResponseType} from 'app/types/response'
import {trpc} from '@utils/trpc'
import useModalContext from '@hooks/modal/useModalContext'
import {usePositionContext} from '@hooks/position/usePositionContext'

export default function useRemovePosition(
  id: number
): readonly [() => Promise<RemovePositionResponseType>] {
  const result = trpc.position.remove.useMutation()
  const {dispatch} = usePositionContext()
  const {setIsOpen} = useModalContext()
  const handleConfirm = async (): Promise<RemovePositionResponseType> => {
    try {
      const response = await result.mutateAsync({positionId: id})
      if (response.status === 200) {
        dispatch({type: PAction.remove, payload: response.position.id})
        return response
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    } finally {
      setIsOpen(false)
    }
  }
  return [handleConfirm] as const
}
