import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useModalContext from '@hooks/modal/useModalContext'
import {useProjectContext} from '@hooks/project/useProjectContext'

import {deleteProjectByIdWithToken} from '@api/fetchWithToken'
import type {RemoveProjectResponseType} from 'app/types/response'

export default function useRemoveProject(
  id: number
): () => Promise<RemoveProjectResponseType> {
  const {remove} = useProjectContext()
  const token = useSessionCookie()
  const {setIsOpen} = useModalContext()
  const handleConfirm = async (): Promise<RemoveProjectResponseType> => {
    try {
      const response = await deleteProjectByIdWithToken(token, id)
      if (response.status === 200) {
        setIsOpen(false)
        remove(response.data.project.id)
        return Promise.resolve(response.data)
      }
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return handleConfirm
}
