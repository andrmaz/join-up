import {Control} from 'react-hook-form'
export interface IFormInput {
  id: string
  name: string
  type: string
  label: string
  placeholder: string
  register: React.Ref<T>
  defaultValue?: string
  optional?: boolean
  errors?: JSX.Element | undefined
}

export type SelectOptions = {value: string; label: string}

export interface IFormSelect {
  id: string
  label: string
  options: SelectOptions[]
  placeholder: string
  message: string
  control: Control
  onChange: (values: any) => void
  errors?: JSX.Element | undefined
  disabled?: boolean
}

export type AsyncState = {
  status: string
  data: [] | undefined
  error: string | null
}
