import {useFetchContext} from '@hooks/fetch/useFetchContext'
import useModalContext from '@hooks/modal/useModalContext'

import type {StatusResponseType} from 'app/types/response'

export default function useAddApplication(
  id: number
): () => Promise<StatusResponseType> {
  const fetchContext = useFetchContext()
  const {setIsOpen} = useModalContext()
  const handleConfirm = async (): Promise<StatusResponseType> => {
    try {
      const response = await fetchContext.authAxios.post<StatusResponseType>(
        '/application',
        {
          position: id,
        }
      )
      const {data} = response
      if (response.status === 201) {
        setIsOpen(false)
        return Promise.resolve(data)
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return handleConfirm
}
