import type {NestedOptions} from 'app/types/form'
import type {NestedStrings} from 'app/types/project'

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
  languages: NestedStrings
  technologies: NestedStrings
  bio?: string
}
export interface IUserContext {
  _id: number
  username: string
  email: string
  githubURL?: string
  gitlabURL?: string
  bitbucketURL?: string
  linkedinURL?: string
  avatar: string
  bio?: string
  languages: NestedOptions
  technologies: NestedOptions
}

export type UserData = IUserContext | null

export type UserState = {
  user: UserData
}

export type UserActions =
  | {type: 'login'; payload: IUserContext}
  | {type: 'logout'}
  | {type: 'edit'; payload: IUserContext}

export type UserDispatch = (action: UserActions) => void

export type UserProviderProps = {children: React.ReactNode}
