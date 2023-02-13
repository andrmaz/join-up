import {DrawerValues} from 'app/types/components'
import {IProjectData} from 'app/types/project'
import {selectAllWhere} from '../interfaces/trx'

export const getProjectList = async (
  input: DrawerValues
): Promise<IProjectData[]> => {
  const {available} = input
  const projects = await selectAllWhere<IProjectData>('projects', {
    key: 'available',
    value: available ? 't' : 'f',
  })
  return projects
}
