import type {IPositionInput} from 'app/types/position'
import {PActions} from 'app/types/constants'
import type {PositionResponseType} from 'app/types/response'
import {useFetchContext} from '@hooks/fetch/useFetchContext'
import useModalContext from '@hooks/modal/useModalContext'
import {usePositionContext} from '@hooks/position/usePositionContext'

export default function useAddPosition(
  id: number
): readonly [(data: IPositionInput) => Promise<PositionResponseType>] {
  const fetchContext = useFetchContext()
  const {setIsOpen} = useModalContext()
  const {dispatch} = usePositionContext()
  const onSubmit = async (
    data: IPositionInput
  ): Promise<PositionResponseType> => {
    try {
      data.projectId = id
      const response = await fetchContext.authAxios.post<PositionResponseType>(
        '/position',
        {
          position: data,
        }
      )
      if (response.status === 201) {
        dispatch({type: PActions.add, payload: response.data.position})
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
