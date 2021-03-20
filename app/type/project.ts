export interface INewProject {
    //? pass project owner for future use cases
    owner: string
    name: string
    description?: string
    technologies: string[] | string
    url?: string
}

export interface IProject {
    _id: string
    updatedAt: string
    technologies: string[]
    sortName: string
    projectURL?: string
    name: string
    description?: string
    createdAt: string
    //TODO check type of collaborator instead of string
    collaborators: Array<string>
}
