import Button from '@lib/Button'
import type {ButtonType} from 'app/types/form'
import useFocusTrapRefContext from '@hooks/ref/useRefContext'

const FocusButton = ({...delegated}: ButtonType): JSX.Element => {
  const ref = useFocusTrapRefContext()
  return (
    <Button onKeyDown={() => ref?.current?.focus()} {...delegated}>
      Cancel
    </Button>
  )
}

export default FocusButton
