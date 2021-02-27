export interface UserContextInterface {
    username: string
    email: string
    github?: string
    gitlab?: string
    bitbucket?: string
    linkndIn?: string
    avatar: string
    bio: string
    languages: string[]
    technologies: string[]
}

export type UserState = {
    user: UserContextInterface | null
    login: (data: UserContextInterface) => void
    logout: () => void
}

export type UserActions =
    | {type: 'login'; payload: UserContextInterface}
    | {type: 'logout'}
