import * as React from 'react'
import useModalContext from '@hooks/modal/useModalContext'

import type {ChildrenPropsType} from 'app/types/modal'

const OpenButton = (props: ChildrenPropsType): JSX.Element => (
  <ModalOpenButton>
    <button
      tabIndex={0}
      type='button'
      className='h-auto w-auto py-1 px-2 cursor-pointer bg-blue-600 text-white rounded active:bg-blue-800'
      aria-pressed={false}
    >
      {props.children}
    </button>
  </ModalOpenButton>
)

function ModalOpenButton({
  children: child,
}: {
  children: React.ReactElement
}): JSX.Element {
  const {setIsOpen} = useModalContext()
  const onClick = (): void => setIsOpen(true)
  return <React.Fragment>{React.cloneElement(child, {onClick})}</React.Fragment>
}

export {OpenButton, ModalOpenButton}
