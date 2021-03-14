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
interface UserContextInterface {
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
    user: UserContextInterface | null
}

export type UserActions =
    | {type: 'login'; payload: UserContextInterface}
    | {type: 'logout'}
    | {type: 'persist'; payload: UserContextInterface}

export type UserDispatch = (action: UserActions) => void

export type UserProviderProps = {children: React.ReactNode}
