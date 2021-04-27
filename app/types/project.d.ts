import {NestedValue} from 'react-hook-form'

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
  technologies: string[]
  projectURL?: string
  owner: number
  //TODO check type of collaborator
  collaborators: Array<string>
  hasPositions: boolean
  createdAt: string
  updatedAt: string
}
