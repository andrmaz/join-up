import * as React from 'react'
import axios from 'axios'
import {usePositionContext} from '@hooks/position/usePositionContext'
import type {IPositionData} from 'app/types/position'
import type {PositionResponseType} from 'app/types/response'

export default function useEditPosition(
  token: string,
  positionId: number | undefined,
  projectId: number | undefined,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
): (data: IPositionData) => Promise<PositionResponseType> {
  const {dispatch} = usePositionContext()
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
        setShowModal(false)
        return Promise.resolve(response.data)
      }
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return onSubmit // as const
}
