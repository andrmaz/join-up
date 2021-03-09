interface UserContextInterface {
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
}

export type UserActions =
    | {type: 'login'; payload: UserContextInterface}
    | {type: 'logout'}
    | {type: 'persist'; payload: UserContextInterface}

export type UserDispatch = (action: UserActions) => void

export type UserProviderProps = {children: React.ReactNode}
