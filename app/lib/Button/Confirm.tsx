import type {ConfirmButtonType} from 'app/types/form'

const STYLES = {
  success: {
    '--bg': 'bg-green-600',
    '--focus': 'bg-green-800',
  },
  danger: {
    '--bg': 'bg-red-600',
    '--focus': 'bg-red-800',
  },
}

export const ConfirmButton = ({
  children = 'Confirm',
  errors = false,
  variant,
  onClick,
}: ConfirmButtonType): JSX.Element => {
  const styles = STYLES[variant]
  return (
    <button
      type='button'
      onClick={onClick}
      className={`w-16 min-w-max h-8 p-1 cursor-pointer ${styles['--bg']} text-white rounded m-1 disabled:opacity-50 focus:${styles['--focus']}`}
      disabled={errors}
    >
      {children}
    </button>
  )
}
