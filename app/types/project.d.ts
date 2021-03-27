import {NestedValue} from 'react-hook-form'

export interface IProjectInput {
  //? pass project owner for future use cases
  owner: string
  name: string
  description?: string
  // refer to https://github.com/react-hook-form/react-hook-form/issues/987
  technologies: NestedValue<string[]>
  projectURL?: string
}

export interface IProjectData {
  _id: string
  updatedAt: string
  technologies: string[]
  sortName: string
  projectURL?: string
  name: string
  description?: string
  createdAt: string
  //TODO check type of collaborator
  collaborators: Array<string>
  jobsAvailable: boolean
}
