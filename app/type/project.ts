export interface INewProject {
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
    projectURL: string
    name: string
    description: string
    createdAt: string
    collaborators: Array<string>
}
