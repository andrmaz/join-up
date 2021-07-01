/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import * as React from 'react'

import useRefCallback from '@hooks/ref/useRefCallback'

import Portal from '@components/containers/Portal/Portal'
import Modal from '@components/containers/Modal/Modal'
import CancelButton from '@components/form/Button/Cancel'
import {ConfirmButton} from '@components/form/Button/Confirm'
import CloseButton from '@components/form/Button/Close'
import type {AlertDialogType} from 'app/types/notification'

const AlertDialog = ({
  title = 'Confirm your choice',
  message,
  showDialog,
  setShowDialog,
  handleConfirm,
}: AlertDialogType): React.ReactElement => {
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  return (
    <React.Fragment>
      {showDialog && (
        <Portal>
          <Modal height='1/6' width='2/4' top='1/4' color='red-600'>
            <div className='h-full w-full'>
              <div className='w-full h-2/3'>
                <header className='h-1/2 flex justify-between'>
                  <h2
                    id='dialog_label'
                    tabIndex={-1}
                    ref={setRef}
                    className='h-1/2 focus:ring-2 focus:ring-yellow-600 text-xl font-bold'
                  >
                    {title}
                  </h2>
                  <CloseButton
                    onClickAction={() => setShowDialog(false)}
                    focusRef={focusTrapRef}
                  />
                </header>
                <span role='article' tabIndex={0} className='h-1/2'>
                  {message}
                </span>
              </div>
              <div className='w-full h-1/3 flex'>
                <ConfirmButton bgColor='red' onClickAction={handleConfirm}>
                  Confirm
                </ConfirmButton>
                <CancelButton
                  onClickAction={() => setShowDialog(false)}
                  onKeyDownAction={() => focusTrapRef.current?.focus()}
                />
              </div>
            </div>
          </Modal>
        </Portal>
      )}
    </React.Fragment>
  )
}

export default AlertDialog
