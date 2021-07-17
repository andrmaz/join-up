import * as React from 'react'
import {ModalProvider} from '@providers/ModalProvider'

import ModalOpenButton from '@components/lib/Modal/OpenButton'
import ModalContents from '@components/lib/Modal/Contents'

import {RemoveProjectForm} from '@components/Form/project/helpers/Remove'
import {RiDeleteBin6Line} from 'react-icons/ri'

const RemoveProject = ({id}: {id: number}): JSX.Element => {
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
        title='Edit position'
        focusTrapRef={focusTrapRef}
        aria-label='Edit position'
      >
        <RemoveProjectForm
          id={id}
          onKeyDown={() => focusTrapRef.current?.focus()}
        />
      </ModalContents>
    </ModalProvider>
  )
}

export default RemoveProject
