import type {IPositionInput} from 'app/types/position'
import {PActions} from 'app/types/constants'
import type {PositionResponseType} from 'app/types/response'
import {useFetchContext} from '@hooks/fetch/useFetchContext'
import useModalContext from '@hooks/modal/useModalContext'
import {usePositionContext} from '@hooks/position/usePositionContext'

export default function useEditPosition(
  positionId: number,
  projectId: number
): readonly [(data: IPositionInput) => Promise<PositionResponseType>] {
  const fetchContext = useFetchContext()
  const {dispatch} = usePositionContext()
  const {setIsOpen} = useModalContext()
  const onSubmit = async (
    data: IPositionInput
  ): Promise<PositionResponseType> => {
    try {
      data.projectId = projectId
      const response = await fetchContext.authAxios.patch<PositionResponseType>(
        `/position/${positionId}`,
        {
          position: data,
        }
      )
      if (response.status === 200) {
        dispatch({type: PActions.edit, payload: response.data.position})
        setIsOpen(false)
        return Promise.resolve(response.data)
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [onSubmit] as const
}
