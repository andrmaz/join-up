import React from 'react'
import {Control, SetValueConfig, FieldElement} from 'react-hook-form'

import type {ISigninInputs, ISignupInputs, IUserContext} from 'app/types/user'
import type {IProjectData} from 'app/types/project'
import type {IPositionData} from 'app/types/position'

import type {StatusResponseType, UserResponseType} from 'app/types/response'

//* Inputs
type RegisterType = (ref: (FieldElement<T> & React.Ref) | null) => void

export interface IFormInput {
  id: string
  name: string
  type: string
  label: string
  placeholder: string
  register: RegisterType
  defaultValue?: string
  optional?: boolean
  errors?: Record<string, any>
}

export interface IVacancyInput {
  defaultValue?: number
  register: React.Ref<T>
}

export type FormInputType = {
  id?: string
  name?: string
  label?: string
  register: (ref: FieldElement<T> & React.Ref) => RegisterType
  defaultValue?: string
  errors?: DeepMap<T, FieldError>
}

//* Selects
export type SelectOptionsType = {id: number; label: string}

export interface IFormSelect {
  control: Control | undefined
  setValue: (name: any, value: unknown, config?: SetValueConfig) => void
  errors?: Record<string, any>
  disabled?: boolean
  defaultValues?: SelectOptionsType[]
  defaultValue?: SelectOptionsType[]
  id?: number
  token?: string
}

export interface IPositionSelect {
  control: Control
  setValue: (name: any, value: unknown, config?: SetValueConfig) => void
  errors?: Record<string, any>
  defaultValue?: SelectOptionsType
}

//*Buttons
export type SubmitButtonType = {
  value?: string
  errors?: boolean
  bgColor?: string
}

export type ConfirmButtonType = {
  children?: string
  errors?: boolean
  bgColor?: string
  onClickAction?: () => void
}

export type ActionButtonType = {
  children: string
  action: () => void
  tabIndex?: number
  bgColor?: string
}

export type CancelButtonType = {
  onClickHandler: () => void
  onKeyDownHandler?: () => void
}

export type CloseButtonType = {
  onClickAction: () => void
  focusRef?: React.Ref<T>
}

//* Forms
export interface ISigninForm {
  handleSubmit: (field: any) => typeof onSubmit
  onSubmit: (data: ISigninInputs) => Promise<UserResponseType>
  register: (ref: any) => RegisterType
  errors: Record<string, any>
}

export interface ISignupForm {
  handleSubmit: (field: any) => typeof onSubmit
  onSubmit: (data: ISignupInputs) => Promise<UserResponseType>
  register: (ref: any) => RegisterType
  errors: Record<string, any>
  watchPassword: string
  control: Control
  setValue: (name: any, value: unknown, config?: SetValueConfig) => void
}

export interface IUserForm {
  handleSubmit: (field: any) => typeof onSubmit
  onSubmit: (data: any) => Promise<IUserContext | StatusResponseType>
  register: (ref: any) => RegisterType
  errors: Record<string, any>
  reset: (values?: Record<string, any>, omitResetState?: OmitResetState) => void
  watchPassword?: string
}

export interface IProfileForm {
  handleSubmit: (field: any) => typeof onSubmit
  onSubmit: (data: any) => Promise<IUserContext | StatusResponseType>
  register: (ref: any) => RegisterType
  errors: Record<string, any>
  reset: (values?: Record<string, any>, omitResetState?: OmitResetState) => void
  control: Control
  setValue: (name: any, value: unknown, config?: SetValueConfig) => void
  token: string
}

export interface IProjectForm {
  token: string
  project?: IProjectData
  register: (ref: any) => RegisterType
  errors: Record<string, any>
  control: Control
  setValue: (name: any, value: unknown, config?: SetValueConfig) => void
}

export interface IPositionForm {
  id?: number
  token: string
  position?: IPositionData
  register: (ref: any) => RegisterType
  errors: Record<string, any>
  control: Control
  setValue: (name: any, value: unknown, config?: SetValueConfig) => void
}
