import Button from '@lib/Button'
import type {ButtonType} from 'app/types/form'
import useFocusTrapRefContext from '@hooks/ref/useRefContext'

const FocusButton = (props: Omit<ButtonType, 'onKeyDown'>): JSX.Element => {
  const ref = useFocusTrapRefContext()
  return (
    <Button onKeyDown={() => ref?.current?.focus()} {...props}>
      Cancel
    </Button>
  )
}

export {FocusButton}
