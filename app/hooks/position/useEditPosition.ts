import useModalContext from '@hooks/modal/useModalContext'
import {usePositionContext} from '@hooks/position/usePositionContext'
import useSessionCookie from '@hooks/cookie/useSessionCookie'
import {editPositionWithToken} from '@api/fetchWithToken'

import type {IPositionInput} from 'app/types/position'
import type {PositionResponseType} from 'app/types/response'

export default function useEditPosition(
  positionId: number,
  projectId: number
): (data: IPositionInput) => Promise<PositionResponseType> {
  const token = useSessionCookie()
  const {dispatch} = usePositionContext()
  const {setIsOpen} = useModalContext()
  const onSubmit = async (
    data: IPositionInput
  ): Promise<PositionResponseType> => {
    try {
      data.projectId = projectId
      const response = await editPositionWithToken(data, token, positionId)
      if (response.status === 200) {
        dispatch({type: 'edit', payload: response.data.position})
        setIsOpen(false)
        return Promise.resolve(response.data)
      }
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return onSubmit // as const
}
