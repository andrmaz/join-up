export interface INewProject {
    owner: string
    name: string
    description?: string
    technologies: string[] | string
    url?: string
}

export interface IProject {
    _id: string
    owner: string
    name: string
    description?: string
    technologies: string[] | string
    projectURL?: string
    collaborators: Array<string>
}
