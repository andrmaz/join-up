import {useRouter} from 'next/router'
import {useProjectContext} from '@hooks/project/useProjectContext'
import {useFetchContext} from '@hooks/fetch/useFetchContext'

import type {IProjectInput} from 'app/types/project'
import type {ProjectResponseType} from 'app/types/response'

export default function useAddProject(): (
  data: IProjectInput
) => Promise<ProjectResponseType> {
  const fetchContext = useFetchContext()
  const {add} = useProjectContext()
  const router = useRouter()
  const onSubmit = async (
    data: IProjectInput
  ): Promise<ProjectResponseType> => {
    try {
      const response = await fetchContext.authAxios.post<ProjectResponseType>(
        '/project',
        {
          project: data,
        }
      )
      if (response.status === 201) {
        add(response.data.project)
        router.push('/profile')
        return Promise.resolve(response.data)
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return onSubmit
}
