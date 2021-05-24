/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import * as React from 'react'
import axios from 'axios'

import {useCookies} from 'react-cookie'
import useRefCallback from '@hooks/ref/useRefCallback'

import Portal from '@components/containers/Portal/Portal'
import CancelButton from '@components/form/Button/Cancel'
import {ConfirmButton} from '@components/form/Button/Confirm'
import CloseButton from '@components/form/Button/Close'

const AlertDialog = ({
  id,
  title = 'Confirm your choice',
  message,
  showDialog,
  setShowDialog,
}: {
  id: string
  title?: string
  message: string
  showDialog: boolean
  setShowDialog: (state: boolean) => void
}): JSX.Element => {
  //* Get user token from session cookie
  const [cookies] = useCookies(['session'])
  const {session: token} = cookies
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  const handleConfirm = async (): Promise<any> => {
    try {
      const response = await axios.delete(`/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status === 200) {
        setShowDialog(false)
        return
      }
    } catch (error) {
      Promise.reject(error)
    }
  }
  return (
    <React.Fragment>
      {showDialog && (
        <Portal>
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
              className='fixed h-1/6 w-2/4 top-1/4 right-1/4 bg-white border-red-600 border-2 rounded p-4'
            >
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
            </article>
          </section>
        </Portal>
      )}
    </React.Fragment>
  )
}

export default AlertDialog
