import {DismissButton} from '@lib/Modal/DismissButton'
import {FocusTrapRefProvider} from '@providers/RefProvider'
import {GrFormClose} from 'react-icons/gr'
import ModalContentsBase from '@lib/Modal/ContentsBase'
import useRefCallback from '@hooks/ref/useRefCallback'

export default function ModalContents({
  title,
  children,
  ...props
}: {
  title: string
  children: React.ReactNode
}): JSX.Element {
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  return (
    <ModalContentsBase {...props}>
      <FocusTrapRefProvider>
        <header className='h-16 flex justify-between'>
          <h2
            id='dialog_label'
            tabIndex={-1}
            ref={setRef}
            className='focus:ring-2 focus:ring-yellow-600 h-1/2 text-2xl'
          >
            {title}
          </h2>
          <DismissButton>
            <GrFormClose aria-label='dialog_close' tabIndex={-1} />
          </DismissButton>
        </header>
        {children}
      </FocusTrapRefProvider>
    </ModalContentsBase>
  )
}
