export type ChildrenPropsType = React.PropsWithChildren<React.ReactNode>

export type ModalDispatchType = React.Dispatch<React.SetStateAction<boolean>>

export type ModalContextType = {isOpen: boolean; setIsOpen: ModalDispatchType}
