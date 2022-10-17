import * as React from 'react'

import type {ChildrenPropsType} from 'app/types/modal'
import useFocusTrapRefContext from '@hooks/ref/useRefContext'
import useModalContext from '@hooks/modal/useModalContext'

function DismissButton(props: ChildrenPropsType): JSX.Element {
  const ref = useFocusTrapRefContext()
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <ModalDismissButton>
        <button ref={ref}>{props.children}</button>
      </ModalDismissButton>
    </div>
  )
}

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
