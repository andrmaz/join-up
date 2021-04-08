import {Control} from 'react-hook-form'
import type {SelectOptions} from 'app/types/form'
import type {NestedStrings} from 'app/types/project'

export interface IDrawerProps {
  register: (Ref: any) => void
  isPending: boolean
  options: SelectOptions[]
  onChange: (values: any) => void
  control: Control
  technologies: NestedStrings
}

export type DrawerInputsProps = {
  register: (Ref: any) => void
  isPending: boolean
}
