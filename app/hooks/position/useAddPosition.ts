import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useModalContext from '@hooks/modal/useModalContext'
import {usePositionContext} from '@hooks/position/usePositionContext'

import {addPositionWithToken} from '@api/fetchWithToken'
import type {IPositionInput} from 'app/types/position'
import type {PositionResponseType} from 'app/types/response'

export default function useAddPosition(
  id: number
): (data: IPositionInput) => Promise<PositionResponseType> {
  const token = useSessionCookie()
  const {setIsOpen} = useModalContext()
  const {dispatch} = usePositionContext()
  const onSubmit = async (
    data: IPositionInput
  ): Promise<PositionResponseType> => {
    try {
      data.projectId = id
      const response = await addPositionWithToken(data, token)
      if (response.status === 201) {
        dispatch({type: 'add', payload: response.data.position})
        setIsOpen(false)
        return Promise.resolve(response.data)
      }
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return onSubmit
}
