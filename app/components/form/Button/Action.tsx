export const ActionButton = ({
  children,
  action,
  tabIndex,
}: {
  children: string
  action: () => void
  tabIndex?: number
}): JSX.Element => (
  <button
    tabIndex={tabIndex}
    type='button'
    className='h-auto w-full py-1 cursor-pointer bg-blue-600 text-white rounded active:bg-blue-800'
    onClick={action}
    aria-pressed={false}
  >
    {children}
  </button>
)
