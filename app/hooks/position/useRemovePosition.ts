import {useFetchContext} from '@hooks/fetch/useFetchContext'
import {usePositionContext} from '@hooks/position/usePositionContext'
import useModalContext from '@hooks/modal/useModalContext'

import type {RemovePositionResponseType} from 'app/types/response'
import {Actions} from 'app/types/position'

export default function useRemovePosition(
  id: number
): () => Promise<RemovePositionResponseType> {
  const fetchContext = useFetchContext()
  const {dispatch} = usePositionContext()
  const {setIsOpen} = useModalContext()
  const handleConfirm = async (): Promise<RemovePositionResponseType> => {
    try {
      const response =
        await fetchContext.authAxios.delete<RemovePositionResponseType>(
          `/position/${id}`
        )
      if (response.status === 200) {
        setIsOpen(false)
        dispatch({type: Actions.remove, payload: response.data.position.id})
        return Promise.resolve(response.data)
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return handleConfirm
}
