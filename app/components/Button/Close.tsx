import {ICloseButton} from 'app/types/components'

const CloseButton = ({onClick}: ICloseButton): JSX.Element => (
  <button className='btn btn-neutral' onClick={onClick}>
    <span aria-label='dialog_close' tabIndex={-1}>
      &times;
    </span>
  </button>
)

export default CloseButton
