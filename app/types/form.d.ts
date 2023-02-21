import React from 'react'
import {Control, UseFormSetValue, UseFormRegisterReturn} from 'react-hook-form'

import type {IProjectData, IProjectInput} from 'app/types/project'
import type {IPositionData, IPositionInput} from 'app/types/position'

import type {
  ProjectResponseType,
  PositionResponseType,
} from 'app/types/response'

//* Inputs
export interface IFormInput {
  id: string
  name: string
  type: React.HTMLInputTypeAttribute
  label: string
  placeholder: string
  inputProps: UseFormRegisterReturn
  defaultValue?: string
  optional?: boolean
  errors?: Record<string, any>
}

export type FormInputType = {
  id: string
  name: string
  label?: string
  inputProps: UseFormRegisterReturn
  defaultValue?: string
  errors?: Record<string, any>
}

export type InputSubmitType = {
  value?: string
  disabled?: boolean
  bgColor?: string
}

//* Selects
export type SelectOptionsType<T extends string> = {id: number; label: T}

export interface IFormSelect {
  control: Control<any>
  setValue: UseFormSetValue
  errors?: Record<string, any>
  disabled?: boolean
  defaultValues?: SelectOptionsType<string>[]
  defaultValue?: SelectOptionsType<string>[]
  id?: number
}

export interface IPositionSelect {
  control: Control<any>
  setValue: UseFormSetValue
  errors?: Record<string, any>
  defaultValue?: SelectOptionsType<string>
}

//*Buttons
export type ButtonType = {
  children?: string
  disabled?: boolean
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
