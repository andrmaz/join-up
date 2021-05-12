import {CheckCircle} from '@components/custom/Icon/CheckCircle'

const SnackBar = ({
  color,
  message,
}: {
  color: string
  message: string
}): JSX.Element => (
  <div
    className={`animate-bounce absolute flex h-14 w-96 min-w-max bottom-4 left-4 p-3 bg-${color}-600 rounded`}
  >
    <CheckCircle />
    <h1 className='text-xl text-white text-center ml-2'>{message}</h1>
  </div>
)

export default SnackBar
