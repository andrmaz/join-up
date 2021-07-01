import * as React from 'react'

import Portal from '@components/containers/Portal/Portal'

const Modal = ({
  children,
  height,
  width = '1/2',
  top = '32',
  color = 'black',
}: {
  children: React.ReactNode
  height: string
  width?: string
  top?: string
  color?: string
}): JSX.Element => (
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
        className={`fixed h-${height} w-${width} top-${top} right-1/4 bg-white border-${color} border-2 rounded p-4`}
      >
        {children}
      </article>
    </section>
  </Portal>
)

export default Modal
