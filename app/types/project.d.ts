import {useProjectProvider} from '@hooks/project/useProjectProvider'
//import {NestedValue} from 'react-hook-form'
import {IAuthUser} from 'app/types/user'
import {SelectOptionsType} from 'app/types/form'
import {PAction} from 'app/types/constants'

// https://github.com/react-hook-form/react-hook-form/issues/987
export type NestedNumbersType = number[]

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
  userId: number
  collaborators: Array<IAuthUser>
  available: boolean
  created_at: string
  updated_at: string
}

export type ProjectActionsType =
  | {type: PAction.add; payload: IProjectData}
  | {type: PAction.remove; payload: number}
  | {type: PAction.edit; payload: IProjectData}
  | {type: PAction.persist; payload: IProjectData[]}
  | {type: PAction.clear}

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
