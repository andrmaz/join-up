import type {NestedOptionsType} from 'app/types/form'
import type {NestedStringsType} from 'app/types/project'

export interface ISigninInputs {
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
  languages: NestedStringsType
  technologies: NestedStringsType
  bio?: string
}
export interface IUserContext {
  id: number
  username: string
  email: string
  githubURL?: string
  gitlabURL?: string
  bitbucketURL?: string
  linkedinURL?: string
  avatar: string
  bio?: string
  languages: NestedOptionsType
  technologies: NestedOptionsType
}

export type UserDataType = IUserContext | null

export type UserState = {
  user: UserDataType
}

export type UserActionsType =
  | {type: 'login'; payload: IUserContext}
  | {type: 'logout'}
  | {type: 'edit'; payload: IUserContext}

export type UserDispatchType = (action: UserActionsType) => void

export interface IEditUsername {
  newUsername: string
  password: string
}
export interface IEditEmail {
  newEmail: string
  password: string
}
export interface IEditPassword {
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
}
