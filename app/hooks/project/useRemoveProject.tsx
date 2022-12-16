import type {RemoveProjectResponseType} from 'app/types/response'
import {trpc} from '@utils/trpc'
import useModalContext from '@hooks/modal/useModalContext'
import {useProjectContext} from '@hooks/project/useProjectContext'

export default function useRemoveProject(
  id: number
): readonly [() => Promise<RemoveProjectResponseType>] {
  const result = trpc.project.remove.useMutation()
  const {remove} = useProjectContext()
  const {setIsOpen} = useModalContext()
  const handleConfirm = async (): Promise<RemoveProjectResponseType> => {
    try {
      const response = await result.mutateAsync({projectId: id})
      if (response.status === 200) {
        remove(response.project.id)
        return response
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    } finally {
      setIsOpen(false)
    }
  }
  return [handleConfirm] as const
}
