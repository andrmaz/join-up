import * as React from 'react'
import axios from 'axios'
import useRefCallback from '@hooks/ref/useRefCallback'
import {usePositionContext} from '@hooks/position/usePositionContext'
import type {IPosistionData} from 'app/types/position'
import type {PositionResponseType} from 'app/types/response'

export default function useEditPosition(
  token: string,
  positionId: string,
  projectId: number,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
): readonly [
  React.MutableRefObject<HTMLElement | null>,
  (node: HTMLInputElement) => void,
  (data: IPosistionData) => Promise<PositionResponseType>
] {
  const {dispatch} = usePositionContext()
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  const onSubmit = async (
    data: IPosistionData
  ): Promise<PositionResponseType> => {
    try {
      data.projectId = projectId
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
  return [focusTrapRef, setRef, onSubmit] // as const
}
