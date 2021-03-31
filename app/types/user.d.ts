import {NestedValue} from 'react-hook-form'

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
  // refer to https://github.com/react-hook-form/react-hook-form/issues/987
  languages: NestedValue<string[]>
  technologies: NestedValue<string[]>
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
  // refer to https://github.com/react-hook-form/react-hook-form/issues/987
  languages: NestedValue<string[]>
  technologies: NestedValue<string[]>
}

export type UserState = {
  user: IUserContext | null
}

export type UserActions =
  | {type: 'login'; payload: IUserContext}
  | {type: 'logout'}
  | {type: 'edit'; payload: IUserContext}

export type UserDispatch = (action: UserActions) => void

export type UserProviderProps = {children: React.ReactNode}
