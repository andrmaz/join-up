export type ChildrenPropsType = {children: React.ReactNode}

export type ModalPropsType = {
  children: React.ReactNode
  height: string
  width?: string
  top?: string
  color?: string
}

export type ModalDispatchType = React.Dispatch<React.SetStateAction<boolean>>

export type ModalContextType = {isOpen: boolean; setIsOpen: ModalDispatchType}
