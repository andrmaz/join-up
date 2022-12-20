import type {SelectOptionsType} from 'app/types/form'
import type {NestedNumbersType} from 'app/types/project'
import {Language, Technology, UActions} from 'app/types/constants'

export interface ISigninInput {
  email: string
  password: string
}

export interface ISignupInput {
  name: string
  email: string
  password: string
  confirmPassword: string
  githubURL?: string
  gitlabURL?: string
  bitbucketURL?: string
  linkedinURL?: string
  languages: NestedNumbersType
  technologies: NestedNumbersType
  bio?: string
}

export interface IAuthUser {
  id: string
  email: string
  name: string
  image: string
  githubURL?: string
  gitlabURL?: string
  bitbucketURL?: string
  linkedinURL?: string
  bio?: string
  languages: SelectOptionsType<Language>[]
  technologies: SelectOptionsType<Technology>[]
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
