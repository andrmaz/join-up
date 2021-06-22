export const ActionButton = ({
  children,
  action,
  tabIndex,
  bgColor = 'blue',
}: {
  children: string
  action: () => void
  tabIndex?: number
  bgColor?: string
}): JSX.Element => (
  <button
    tabIndex={tabIndex}
    type='button'
    className={`h-auto w-full py-1 cursor-pointer bg-${bgColor}-600 text-white rounded active:bg-${bgColor}-800`}
    onClick={action}
    aria-pressed={false}
  >
    {children}
  </button>
)
