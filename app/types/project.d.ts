import {useProjectProvider} from '@hooks/project/useProjectProvider'
import {NestedValue} from 'react-hook-form'
import {IAuthUser} from 'app/types/user'
import {SelectOptionsType} from 'app/types/form'
import {PActions} from 'app/types/constants'

// https://github.com/react-hook-form/react-hook-form/issues/987
export type NestedNumbersType = NestedValue<number[]>

export interface IProjectInput {
  name: string
  description: string
  mission: string
  technologies: NestedNumbersType
  projectURL?: string
}

export interface IProjectData {
  id: number
  name: string
  description: string
  mission: string
  technologies: SelectOptionsType<Technology>[]
  projectURL?: string
  owner: number
  collaborators: Array<IAuthUser>
  hasPositions: boolean
  createdAt: string
  updatedAt: string
}

export type ProjectActionsType =
  | {type: PActions.add; payload: IProjectData}
  | {type: PActions.remove; payload: number}
  | {type: PActions.edit; payload: IProjectData}
  | {type: PActions.persist; payload: IProjectData[]}
  | {type: PActions.clear}

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
  data?: {projects: IProjectData[]}
}
