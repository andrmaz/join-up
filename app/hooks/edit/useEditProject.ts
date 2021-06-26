import axios from 'axios'

import {useProjectContext} from '@hooks/project/useProjectContext'

import type {IProjectData} from 'app/types/project'
import type {ProjectResponseType} from 'app/types/response'

export default function useEditProject(
  token: string,
  id: string,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
): (data: IProjectData) => Promise<ProjectResponseType> {
  const {edit} = useProjectContext()
  const onSubmit = async (data: IProjectData): Promise<ProjectResponseType> => {
    try {
      const response = await axios.patch<ProjectResponseType>(
        `/project/${id}`,
        {
          project: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        edit(response.data.project)
        setShowModal(false)
        return Promise.resolve(response.data)
      }
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return onSubmit //as const
}
