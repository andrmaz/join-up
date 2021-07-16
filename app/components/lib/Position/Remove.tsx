import * as React from 'react'
import {ModalProvider} from '@providers/ModalProvider'

import ModalOpenButton from '@components/screen/Modal/OpenButton'
import ModalContents from '@components/screen/Modal/Contents'

import {RemovePositionForm} from '@components/form/Form/position/helpers/Remove'
import {RiDeleteBin6Line} from 'react-icons/ri'

const RemovePosition = ({uid}: {uid: number}): JSX.Element => {
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  return (
    <ModalProvider>
      <ModalOpenButton>
        <RiDeleteBin6Line
          tabIndex={0}
          className='cursor-pointer focus:ring-2 focus:ring-yellow-600'
        />
      </ModalOpenButton>
      <ModalContents
        title='Remove position'
        focusTrapRef={focusTrapRef}
        aria-label='Remove position'
      >
        <RemovePositionForm
          uid={uid}
          onKeyDown={() => focusTrapRef.current?.focus()}
        />
      </ModalContents>
    </ModalProvider>
  )
}

export default RemovePosition
