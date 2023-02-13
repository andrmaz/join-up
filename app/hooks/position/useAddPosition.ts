import type {IPositionInput} from 'app/types/position'
import {PAction} from 'app/types/constants'
import type {PositionResponseType} from 'app/types/response'
import {trpc} from '@utils/trpc'
import useModalContext from '@hooks/modal/useModalContext'
import {usePositionContext} from '@hooks/position/usePositionContext'

export default function useAddPosition(
  id: number
): readonly [(data: IPositionInput) => Promise<PositionResponseType>] {
  const result = trpc.position.create.useMutation()
  const {setIsOpen} = useModalContext()
  const {dispatch} = usePositionContext()
  const onSubmit = async (
    data: IPositionInput
  ): Promise<PositionResponseType> => {
    try {
      data.projectId = id
      const response = await result.mutateAsync(data)
      if (response.status === 201) {
        dispatch({type: PAction.add, payload: response.position})
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
