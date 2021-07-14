import type {ActionButtonType} from 'app/types/form'
export const ActionButton = ({
  children,
  action,
  tabIndex,
  bgColor = 'blue',
}: ActionButtonType): JSX.Element => (
  <button
    tabIndex={tabIndex}
    type='button'
    className={`h-auto w-auto py-1 px-2 cursor-pointer bg-${bgColor}-600 text-white rounded active:bg-${bgColor}-800`}
    onClick={action}
    aria-pressed={false}
  >
    {children}
  </button>
)
