export type SigninInputs = {
    email: string
    password: string
}

export interface ISignupInputs {
    username: string
    email: string
    password: string
    confirmPassword: string
    githubURL?: string
    gitlabURL?: string
    bitbucketURL?: string
    linkedinURL?: string
    languages: string[] | string
    technologies: string[] | string
    bio?: string
}
export interface IUserContext {
    username: string
    email: string
    githubURL?: string
    gitlabURL?: string
    bitbucketURL?: string
    linkedinURL?: string
    avatar: string
    bio?: string
    languages: string[]
    technologies: string[]
}

export type UserState = {
    user: IUserContext | null
}

export type UserActions =
    | {type: 'login'; payload: IUserContext}
    | {type: 'logout'}

export type UserDispatch = (action: UserActions) => void

export type UserProviderProps = {children: React.ReactNode}
