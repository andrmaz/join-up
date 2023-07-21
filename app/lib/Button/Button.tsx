import type {ButtonType} from 'app/types/form'

const Button = ({
  children = 'Confirm',
  disabled = false,
  onClick,
  onKeyDown,
  className = '',
}: ButtonType): JSX.Element => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`btn ` + className}
      disabled={disabled}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  )
}

export default Button
