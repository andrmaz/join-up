import type {IPositionInput} from 'app/types/position'
import {PAction} from 'app/types/constants'
import type {PositionResponseType} from 'app/types/response'
import {trpc} from '@utils/trpc'
import useModalContext from '@hooks/modal/useModalContext'
import {usePositionContext} from '@hooks/position/usePositionContext'

export default function useEditPosition(
  positionId: number,
  projectId: number
): readonly [(data: IPositionInput) => Promise<PositionResponseType>] {
  const result = trpc.position.edit.useMutation()
  const {dispatch} = usePositionContext()
  const {setIsOpen} = useModalContext()
  const onSubmit = async (
    data: IPositionInput
  ): Promise<PositionResponseType> => {
    try {
      data.projectId = projectId
      const response = await result.mutateAsync({positionId, projectId})
      if (response.status === 200) {
        dispatch({type: PAction.edit, payload: response.position})
        return response
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    } finally {
      setIsOpen(false)
    }
  }
  return [onSubmit] as const
}
