import {NestedValue} from 'react-hook-form'
import {IUserContext} from 'app/types/user'
import {NestedOptionsType} from 'app/types/form'
import {useProjectProvider} from '@hooks/project/useProjectProvider'
import type {ProjectsResponseType} from 'app/types/response'

// https://github.com/react-hook-form/react-hook-form/issues/987
export type NestedStringsType = NestedValue<string[]>

export interface IProjectInput {
  name: string
  description: string
  technologies: NestedStringsType
  projectURL?: string
}

export interface IProjectData {
  id: string
  name: string
  description: string
  technologies: NestedOptionsType
  projectURL?: string
  owner: number
  collaborators: Array<IUserContext>
  hasPositions: boolean
  createdAt: string
  updatedAt: string
}
export type ProjectActionsType =
  | {type: 'add'; payload: IProjectData}
  | {type: 'remove'; payload: string}
  | {type: 'edit'; payload: IProjectData}
  | {type: 'persist'; payload: IProjectData[]}
  | {type: 'clear'}

export type ProjectStateType = Array<IProjectData>

export type ProjectContextType = {
  projects: ProjectStateType
  add: (data: IProjectData) => void
  remove: (id: string) => void
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

export type EditProjectType = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<typeof showModal>>
  project: IProjectData
}

export type RemoveProjectType = {
  uid: string
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<typeof showDialog>>
}
