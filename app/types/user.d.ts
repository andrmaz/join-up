import type {SelectOptionsType} from 'app/types/form'
import type {NestedStringsType} from 'app/types/project'
import {UActions} from 'app/types/constants'

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
export interface IAuthUser {
  id: number
  username: string
  email: string
  githubURL?: string
  gitlabURL?: string
  bitbucketURL?: string
  linkedinURL?: string
  avatar: string
  bio?: string
  languages: SelectOptionsType[]
  technologies: SelectOptionsType[]
}

export type UserStateType = IAuthUser | null

export type UserContextType = {
  user: UserStateType
}

export type UserActionsType =
  | {type: UActions.login; payload: UserStateType}
  | {type: UActions.logout}
  | {type: UActions.edit; payload: UserStateType}

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
