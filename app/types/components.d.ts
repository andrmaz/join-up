import {Control} from 'react-hook-form'
import type {NestedStringsType} from 'app/types/project'

//* Drawer
export interface IDrawerProps {
  register: React.Ref<T>
  isPending: boolean
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

//* Panel
export type PanelPropsType = {
  token: string
  isSelectedTab: boolean
}

//*SnackBar
export type SnackBarType = {
  color: string
  message: string
  onClose: () => void
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
