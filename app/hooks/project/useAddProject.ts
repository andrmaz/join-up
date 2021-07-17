import {useRouter} from 'next/router'
import {useProjectContext} from '@hooks/project/useProjectContext'

import {addProjectWithToken} from '@api/fetchWithToken'

import type {IProjectInput} from 'app/types/project'
import type {ProjectResponseType} from 'app/types/response'

export default function useAddProject(
  token: string
): (data: IProjectInput) => Promise<ProjectResponseType> {
  const {add} = useProjectContext()
  const router = useRouter()
  const onSubmit = async (
    data: IProjectInput
  ): Promise<ProjectResponseType> => {
    try {
      const response = await addProjectWithToken(data, token)
      if (response.status === 201) {
        add(response.data.project)
        router.push('/profile')
        return Promise.resolve(response.data)
      }
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return onSubmit
}
