import type {IProjectInput} from 'app/types/project'
import type {ProjectResponseType} from 'app/types/response'
import {trpc} from '@utils/trpc'
import useModalContext from '@hooks/modal/useModalContext'
import {useProjectContext} from '@hooks/project/useProjectContext'

export default function useEditProject(
  id: number
): readonly [(data: IProjectInput) => Promise<ProjectResponseType>] {
  const result = trpc.project.edit.useMutation()
  const {edit} = useProjectContext()
  const {setIsOpen} = useModalContext()
  const onSubmit = async (
    data: IProjectInput
  ): Promise<ProjectResponseType> => {
    try {
      const response = await result.mutateAsync({projectId: id, ...data})
      if (response.status === 200) {
        edit(response.project)
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
