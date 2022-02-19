import Button from '@lib/Button'
import type {DialogType} from 'app/types/components'
import FocusButton from '@components/Button/Focus'
import useModalContext from '@hooks/modal/useModalContext'

const Dialog = ({
  handleConfirm,
  message,
  variant = 'success',
}: DialogType): JSX.Element => {
  const {setIsOpen} = useModalContext()
  return (
    <main>
      <div className='h-16 w-full'>
        <span role='article' className='h-1/2'>
          {message}
        </span>
      </div>
      <div className='w-full h-1/3 flex'>
        <Button onClick={handleConfirm} variant={variant} />
        <FocusButton onClick={() => setIsOpen(false)} />
      </div>
    </main>
  )
}

export default Dialog
