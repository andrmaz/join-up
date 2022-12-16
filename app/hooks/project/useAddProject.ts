import type {IProjectInput} from 'app/types/project'
import type {ProjectResponseType} from 'app/types/response'
import {trpc} from '@utils/trpc'
import {useProjectContext} from '@hooks/project/useProjectContext'
import {useRouter} from 'next/router'

export default function useAddProject(): readonly [
  (data: IProjectInput) => Promise<ProjectResponseType>
] {
  const result = trpc.project.create.useMutation()
  const {add} = useProjectContext()
  const router = useRouter()
  const onSubmit = async (
    data: IProjectInput
  ): Promise<ProjectResponseType> => {
    try {
      const response = await result.mutateAsync(data)
      if (response.status === 201) {
        add(response.project)
        router.push('/profile')
        return response
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [onSubmit] as const
}
