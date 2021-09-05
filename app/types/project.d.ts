import {useProjectProvider} from '@hooks/project/useProjectProvider'
import {NestedValue} from 'react-hook-form'
import {IAuthUser} from 'app/types/user'
import {SelectOptionsType} from 'app/types/form'
import {ProjectsResponseType} from 'app/types/response'

// https://github.com/react-hook-form/react-hook-form/issues/987
export type NestedStringsType = NestedValue<string[]>

export interface IProjectInput {
  name: string
  description: string
  mission: string
  technologies: NestedStringsType
  projectURL?: string
}

export interface IProjectData {
  id: number
  name: string
  description: string
  mission: string
  technologies: SelectOptionsType[]
  projectURL?: string
  owner: number
  collaborators: Array<IAuthUser>
  hasPositions: boolean
  createdAt: string
  updatedAt: string
}

export enum Actions {
  add = 'add',
  remove = 'remove',
  edit = 'edit',
  persist = 'persist',
  clear = 'clear',
}

export type ProjectActionsType =
  | {type: Actions.add; payload: IProjectData}
  | {type: Actions.remove; payload: number}
  | {type: Actions.edit; payload: IProjectData}
  | {type: Actions.persist; payload: IProjectData[]}
  | {type: Actions.clear}

export type ProjectStateType = Array<IProjectData>

export type ProjectContextType = {
  projects: ProjectStateType
  add: (data: IProjectData) => void
  remove: (id: number) => void
  edit: (data: IProjectData) => void
  persist: (data: IProjectData[]) => void
  clear: () => void
}

export type UseProjectContextResults = ReturnType<typeof useProjectProvider>

export type ProjectGridType = {
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  data: ProjectsResponseType | null
}
