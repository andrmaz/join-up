import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormRegisterReturn,
} from 'react-hook-form'
import type {NestedNumbersType} from 'app/types/project'

//* Drawer
export interface IDrawerProps {
  register: UseFormRegister<DrawerValues>
  isPending: boolean
  setValue: UseFormSetValue<DrawerValues>
  control: Control<DrawerValues>
  technologies: NestedNumbersType
}

export type DrawerInputsType = {
  inputProps: UseFormRegisterReturn
  disabled: boolean
}

export interface DrawerValues {
  technologies: NestedNumbersType
  date: 'desc' | 'asc'
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
