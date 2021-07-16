import {useProjectContext} from '@hooks/project/useProjectContext'
import {deleteProjectByIdWithToken} from '@api/fetchWithToken'
import type {ModalDispatchType} from 'app/types/modal'
import type {RemoveProjectResponseType} from 'app/types/response'

export default function useRemoveProject(
  token: string,
  uid: number,
  setShowDialog: ModalDispatchType
): () => Promise<RemoveProjectResponseType> {
  const {remove} = useProjectContext()
  const handleConfirm = async (): Promise<RemoveProjectResponseType> => {
    try {
      const response = await deleteProjectByIdWithToken(token, uid)
      if (response.status === 200) {
        setShowDialog(false)
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
