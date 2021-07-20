import type {ConfirmButtonType} from 'app/types/form'

export const ConfirmButton = ({
  children = 'Confirm',
  errors = false,
  bgColor = 'green',
  onClick,
}: ConfirmButtonType): JSX.Element => (
  <button
    type='button'
    onClick={onClick}
    className={`w-16 min-w-max h-8 p-1 cursor-pointer bg-${bgColor}-600 text-white rounded m-1 disabled:opacity-50 focus:bg-${bgColor}-800`}
    disabled={errors}
  >
    {children}
  </button>
)
