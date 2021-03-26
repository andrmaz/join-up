export interface IProjectInput {
  //? pass project owner for future use cases
  owner: string
  name: string
  description?: string
  technologies: string[] | string
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
}
