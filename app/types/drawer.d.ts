import {Control, NestedValue} from 'react-hook-form'
import type {SelectOptions} from 'app/types/form'

export interface IDrawerProps {
  register: (Ref: any) => void
  isPending: boolean
  options: SelectOptions[]
  onChange: (values: any) => void
  control: Control
  technologies: NestedValue<string[]>
}

export type DrawerInputsProps = {
  register: (Ref: any) => void
  isPending: boolean
}
