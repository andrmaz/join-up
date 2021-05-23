import {Control, NestedValue} from 'react-hook-form'

export interface IFormInput {
  id: string
  name: string
  type: string
  label: string
  placeholder: string
  register: React.Ref<T>
  defaultValue?: string
  optional?: boolean
  errors?: Record<string, any>
}

export type SelectOptions = {id: number; label: string}
export type NestedOptions = NestedValue<SelectOptions[]> | undefined

export interface IFormSelect {
  options: SelectOptions[]
  control: Control
  setValue: (
    name: any,
    value: unknown,
    config?: Partial<{shouldValidate: boolean; shouldDirty: boolean}>
  ) => void
  errors?: Record<string, any>
  disabled?: boolean
  defaultValues?: NestedOptions
  defaultValue?: NestedOptions
}

export interface IDefaultSelect {
  id: string
  name: string
  control: Control
  setValue: (
    name: any,
    value: unknown,
    config?: Partial<{shouldValidate: boolean; shouldDirty: boolean}>
  ) => void
  errors?: Record<string, any>
}

export interface INumberInput {
  id: string
  name: string
  label: string
  register: React.Ref<T>
}

export type FormButton = {
  value?: string
  errors?: boolean
  bgColor?: string
}

export type SaveButton = {
  children?: string
  errors?: boolean
  bgColor?: string
  onClickAction?: () => void
}

export type CloseDialogButton = {
  onClickAction: () => void
  focusRef?: React.Ref<T>
}
