import {Control} from 'react-hook-form'
import type {NestedStringsType} from 'app/types/project'

//* Drawer
export interface IDrawerProps {
  register: React.Ref<T>
  isPending: boolean
  setValue: (
    name: keyof FieldValues,
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

export interface FieldValues {
  technologies: NestedStringsType
  date: 'datedesc' | 'dateasc'
  available: boolean
  match?: 'all' | 'any'
}

//* Menu
export interface IMenuItem {
  label: string
  index: number
  tabRef: React.MutableRefObject<HTMLButtonElement | null>
  isSelectedTab: boolean
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>
}

export interface IMenuTab {
  children: React.ReactNode
  isSelectedTab: boolean
  index: number
  tabRef: React.MutableRefObject<HTMLButtonElement | null>
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>
}

export interface IMenuPanel {
  children: React.ReactNode
  index: number
  isSelectedTab: boolean
}

//* Dialog
export type DialogType = {
  handleConfirm: () => void
  message: string
  variant?: 'success' | 'danger'
}

//* Button
export interface ICloseButton {
  onClick: () => void
}
