import axios from 'axios'

import {usePositionContext} from '@hooks/position/usePositionContext'
import useModalContext from '@hooks/modal/useModalContext'

import type {IPositionData} from 'app/types/position'
import type {PositionResponseType} from 'app/types/response'

export default function useEditPosition(
  token: string,
  positionId: number | undefined,
  projectId: number | undefined
): (data: IPositionData) => Promise<PositionResponseType> {
  const {dispatch} = usePositionContext()
  const {setIsOpen} = useModalContext()
  const onSubmit = async (
    data: IPositionData
  ): Promise<PositionResponseType> => {
    try {
      data.projectId = projectId
        ? projectId
        : parseInt(window.location.pathname)
      const response = await axios.patch<PositionResponseType>(
        `/position/${positionId}`,
        {
          position: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
