import {useProjectContext} from '@hooks/project/useProjectContext'
import useModalContext from '@hooks/modal/useModalContext'
import {useFetchContext} from '@hooks/fetch/useFetchContext'

import type {IProjectInput} from 'app/types/project'
import type {ProjectResponseType} from 'app/types/response'

export default function useEditProject(
  id: number
): (data: IProjectInput) => Promise<ProjectResponseType> {
  const fetchContext = useFetchContext()
  const {edit} = useProjectContext()
  const {setIsOpen} = useModalContext()
  const onSubmit = async (
    data: IProjectInput
  ): Promise<ProjectResponseType> => {
    try {
      const response = await fetchContext.authAxios.patch<ProjectResponseType>(
        `/project/${id}`,
        {
          project: data,
        }
      )
      if (response.status === 200) {
        edit(response.data.project)
        setIsOpen(false)
        return Promise.resolve(response.data)
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return onSubmit //as const
}
