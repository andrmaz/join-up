import React from 'react'
import {Control, SetValueConfig, FieldElement} from 'react-hook-form'

import type {IProjectData, IProjectInput} from 'app/types/project'
import type {IPositionData, IPositionInput} from 'app/types/position'

import type {
  ProjectResponseType,
  PositionResponseType,
} from 'app/types/response'

//* Inputs
type RegisterType = (ref: (FieldElement<T> & React.Ref) | null) => void

export interface IFormInput {
  id: string
  name: string
  type: React.HTMLInputTypeAttribute
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

export type InputSubmitType = {
  value?: string
  errors?: boolean
  bgColor?: string
}

//* Selects
export type SelectOptionsType<T extends string> = {id: number; label: T}

export interface IFormSelect {
  control: Control | undefined
  setValue: (name: any, value: unknown, config?: SetValueConfig) => void
  errors?: Record<string, any>
  disabled?: boolean
  defaultValues?: SelectOptionsType<string>[]
  defaultValue?: SelectOptionsType<string>[]
  id?: number
}

export interface IPositionSelect {
  control: Control
  setValue: (name: any, value: unknown, config?: SetValueConfig) => void
  errors?: Record<string, any>
  defaultValue?: SelectOptionsType<string>
}

//*Buttons
export type ButtonType = {
  children?: string
  errors?: boolean
  variant?: 'success' | 'danger' | 'base'
  onClick: () => void
  onKeyDown?: () => void | undefined
}

//* Forms
export interface IProjectForm {
  project?: IProjectData
  onSubmit: (data: IProjectInput) => Promise<ProjectResponseType>
}

export interface IPositionForm {
  id: number
  position?: IPositionData
  onSubmit: (data: IPositionInput) => Promise<PositionResponseType>
}
