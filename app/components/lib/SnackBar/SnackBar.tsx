import {FaCheckCircle} from 'react-icons/fa'
import CloseButton from '@components/form/Button/Close'
import type {SnackBarType} from 'app/types/components'

const SnackBar = ({color, message, onClose}: SnackBarType): JSX.Element => (
  <section
    className={`absolute h-20 w-96 min-w-max bottom-6 left-4 p-2 bg-${color}-600 rounded`}
  >
    <div className='flex flex-col'>
      <article className='h-1/3 w-full flex justify-end right-0'>
        <CloseButton onClickAction={onClose} />
      </article>
      <article className='flex h-2/3'>
        <FaCheckCircle />
        <h3 className='text-xl text-white text-center ml-2'>{message}</h3>
      </article>
    </div>
  </section>
)

export default SnackBar
