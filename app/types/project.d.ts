import {NestedValue} from 'react-hook-form'
import {IUserContext} from 'app/types/user'
import {useProjectProvider} from '@hooks/project/useProjectProvider'

// https://github.com/react-hook-form/react-hook-form/issues/987
export type NestedStrings = NestedValue<string[]>

export interface IProjectInput {
  //? pass project owner for future use cases
  owner: string
  name: string
  description: string
  technologies: NestedStrings
  projectURL?: string
}

export interface IProjectData {
  id: string
  name: string
  description: string
  technologies: NestedValue<SelectOptions[]>
  projectURL?: string
  owner: number
  collaborators: Array<IUserContext>
  hasPositions: boolean
  createdAt: string
  updatedAt: string
}
export type ProjectState = IProjectData[] | Array

export type ProjectActions =
  | {type: 'add'; payload: IProjectData}
  | {type: 'remove'; payload: string}
  | {type: 'edit'; payload: IProjectData}
  | {type: 'persist'; payload: IProjectData[]}
  | {type: 'clear'}

export type ProjectContextType = {
  projects: ProjectState
  add: (data: IProjectData) => void
  remove: (id: string) => void
  edit: (data: IProjectData) => void
  persist: (data: IProjectData[]) => void
  clear: () => void
}

export type ProjectProviderProps = {children: React.ReactNode}

export type UseProjectContextResults = ReturnType<typeof useProjectProvider>

export type AsyncData = IProjectData[] | undefined

export type AsyncState = {
  status: string
  data: AsyncData
  error: string | null
}

export type AsyncActions =
  | {type: 'idle'}
  | {type: 'pending'}
  | {type: 'resolved'; payload: AsyncData}
  | {type: 'rejected'; payload: string}
