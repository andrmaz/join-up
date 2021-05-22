import {NestedValue} from 'react-hook-form'
import {IUserContext} from 'app/types/user'

// refer to https://github.com/react-hook-form/react-hook-form/issues/987
export type NestedStrings = NestedValue<string[]>

export interface IProjectInput {
  //? pass project owner for future use cases
  owner: string
  name: string
  description?: string
  technologies: NestedStrings
  projectURL?: string
}

export interface IProjectData {
  id: string
  name: string
  description?: string
  technologies: NestedValue<SelectOptions[]>
  projectURL?: string
  owner: number
  collaborators: Array<IUserContext>
  hasPositions: boolean
  createdAt: string
  updatedAt: string
}
