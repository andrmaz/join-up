import useRefCallback from '@hooks/ref/useRefCallback'
import ModalContentsBase from '@components/screen/Modal/ContentsBase'
import {DismissButton} from '@components/screen/Modal/DismissButton'
import {GrFormClose} from 'react-icons/gr'

export default function ModalContents({
  title,
  focusTrapRef,
  children,
  ...props
}: {
  title: string
  focusTrapRef: React.Ref<any>
  children: React.ReactNode
}): JSX.Element {
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  return (
    <ModalContentsBase {...props}>
      <header className='h-16 flex justify-between'>
        <h2
          id='dialog_label'
          tabIndex={-1}
          ref={setRef}
          className='focus:ring-2 focus:ring-yellow-600 h-1/2 text-2xl'
        >
          {title}
        </h2>
        <DismissButton ref={focusTrapRef}>
          <GrFormClose aria-label='dialog_close' tabIndex={-1} />
        </DismissButton>
      </header>
      {children}
    </ModalContentsBase>
  )
}
