/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import * as React from 'react'
import useRefCallback from '@hooks/ref/useRefCallback'

import CancelButton from '@components/Button/Cancel'
import {ConfirmButton} from '@components/Button/Confirm'

const ConfirmDialog = ({
  uid,
  title = 'Confirm your choice',
  message,
  onClose,
}: {
  uid: number
  title?: string
  message: string
  onClose: () => void
}): JSX.Element => {
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  console.info(uid)
  return (
    <section
      id='dialog_layer'
      className='fixed top-0 left-0 h-screen w-screen bg-gray-500 bg-opacity-50 z-50'
    >
      <article
        id='dialog'
        role='dialog'
        aria-label='dialog'
        aria-labelledby='dialog_label'
        aria-modal={true}
        aria-describedby='dialog_label'
        className='fixed h-1/6 w-2/4 top-1/4 right-1/4 bg-white border-black border-2 rounded p-4'
      >
        <div className='h-full w-full'>
          <div className='w-full h-2/3'>
            <h2
              id='dialog_label'
              tabIndex={-1}
              ref={setRef}
              className='h-1/2 focus:ring-2 focus:ring-yellow-600 text-xl'
            >
              {title}
            </h2>
            <span
              ref={focusTrapRef}
              role='article'
              tabIndex={0}
              className='h-1/2'
            >
              {message}
            </span>
          </div>
          <div className='w-full h-1/3 flex'>
            <ConfirmButton value='Confirm' />
            <CancelButton
              onClickAction={onClose}
              onKeyDownAction={() => focusTrapRef.current?.focus()}
            />
          </div>
        </div>
      </article>
    </section>
  )
}

export default ConfirmDialog
