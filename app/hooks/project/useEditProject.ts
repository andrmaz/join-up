import useSessionCookie from '@hooks/cookie/useSessionCookie'
import {useProjectContext} from '@hooks/project/useProjectContext'
import useModalContext from '@hooks/modal/useModalContext'
import {editProjectWithToken} from '@api/fetchWithToken'

import type {IProjectInput} from 'app/types/project'
import type {ProjectResponseType} from 'app/types/response'

export default function useEditProject(
  id: number
): (data: IProjectInput) => Promise<ProjectResponseType> {
  const token = useSessionCookie()
  const {edit} = useProjectContext()
  const {setIsOpen} = useModalContext()
  const onSubmit = async (
    data: IProjectInput
  ): Promise<ProjectResponseType> => {
    try {
      const response = await editProjectWithToken(data, id, token)
      if (response.status === 200) {
        edit(response.data.project)
        setIsOpen(false)
        return Promise.resolve(response.data)
      }
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return onSubmit //as const
}
