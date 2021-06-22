import * as React from 'react'
import useRefCallback from '@hooks/ref/useRefCallback'
import Modal from '@components/containers/Modal/Modal'
import CloseModalButton from '@components/form/Button/Close'

const EditPosition = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<typeof showModal>>
}): React.ReactElement => {
  console.log(setShowModal)
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  return (
    <React.Fragment>
      {showModal && (
        <Modal height='3/4'>
          <header className='h-16 flex justify-between'>
            <h2
              id='dialog_label'
              tabIndex={-1}
              ref={setRef}
              className='focus:ring-2 focus:ring-yellow-600 h-1/2 text-2xl'
            >
              Edit your position data here
            </h2>
            <CloseModalButton
              onClickAction={() => setShowModal(false)}
              focusRef={focusTrapRef}
            />
          </header>
        </Modal>
      )}
    </React.Fragment>
  )
}

export default EditPosition
