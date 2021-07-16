import * as React from 'react'
import useModalContext from '@hooks/modal/useModalContext'
import type {ChildrenPropsType} from 'app/types/modal'

const DismissButton = React.forwardRef<HTMLButtonElement, ChildrenPropsType>(
  function dismissButton(props, ref) {
    return (
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <ModalDismissButton>
          <button ref={ref}>{props.children}</button>
        </ModalDismissButton>
      </div>
    )
  }
)

function ModalDismissButton({
  children: child,
}: {
  children: React.ReactElement
}): JSX.Element {
  const {setIsOpen} = useModalContext()
  const onClick = (): void => setIsOpen(false)
  return <React.Fragment>{React.cloneElement(child, {onClick})}</React.Fragment>
}

export {DismissButton, ModalDismissButton}
