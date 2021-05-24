import {Control} from 'react-hook-form'
import type {SelectOptions} from 'app/types/form'
import type {NestedStrings} from 'app/types/project'

export interface IDrawerProps {
  register: (Ref: any) => void
  isPending: boolean
  options: SelectOptions[]
  setValue: (
    name: any,
    value: unknown,
    config?: Partial<{shouldValidate: boolean; shouldDirty: boolean}>
  ) => void
  control: Control
  technologies: NestedStrings
}

export type DrawerInputsProps = {
  register: (Ref: any) => void
  isPending: boolean
}

export type SettingPanelProps = {
  token: string
  isSelectedTab: boolean
}
