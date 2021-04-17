import * as React from 'react'
import Portal from '@components/Portal/Portal'
import useRefCallback from '@hooks/ref/useRefCallback'

const PositionModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean
  setShowModal: (state: boolean) => void
}): JSX.Element => {
  //* ref will be a callback function instead of a Ref Object
  const [ref] = useRefCallback()
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setShowModal(false)
  }
  return (
    <>
      {showModal && (
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
              className='fixed h-3/5 w-1/2 top-1/4 right-1/4 bg-white border-black border-2 rounded p-2 '
            >
              <h2
                id='dialog_label'
                tabIndex={-1}
                ref={ref}
                className='focus:border-yellow-600'
              >
                Add a new position
              </h2>
              <form>
                <button
                  className='bg-gray-800 text-white p-1 rounded'
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </form>
            </article>
          </section>
        </Portal>
      )}
    </>
  )
}

export default PositionModal
