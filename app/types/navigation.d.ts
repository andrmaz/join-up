import {Control} from 'react-hook-form'
import type {SelectOptionsType} from 'app/types/form'
import type {NestedStringsType} from 'app/types/project'

export interface IDrawerProps {
  register: React.Ref<T>
  isPending: boolean
  options: SelectOptionsType[]
  setValue: (
    name: string,
    value: unknown,
    config?: Partial<{shouldValidate: boolean; shouldDirty: boolean}>
  ) => void
  control: Control
  technologies: NestedStringsType
}

export type DrawerInputsType = {
  register: React.Ref<T>
  isPending: boolean
}

export type PanelPropsType = {
  token: string
  isSelectedTab: boolean
}
