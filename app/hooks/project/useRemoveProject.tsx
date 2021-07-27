import {useFetchContext} from '@hooks/fetch/useFetchContext'
import useModalContext from '@hooks/modal/useModalContext'
import {useProjectContext} from '@hooks/project/useProjectContext'

import type {RemoveProjectResponseType} from 'app/types/response'

export default function useRemoveProject(
  id: number
): () => Promise<RemoveProjectResponseType> {
  const {remove} = useProjectContext()
  const fetchContext = useFetchContext()
  const {setIsOpen} = useModalContext()
  const handleConfirm = async (): Promise<RemoveProjectResponseType> => {
    try {
      const response =
        await fetchContext.authAxios.delete<RemoveProjectResponseType>(
          `/project/${id}`
        )
      if (response.status === 200) {
        setIsOpen(false)
        remove(response.data.project.id)
        return Promise.resolve(response.data)
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return handleConfirm
}
