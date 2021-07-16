import type {IMenuTab} from 'app/types/form'

const Tab = ({
  children,
  isSelectedTab,
  index,
  tabRef,
  setSelectedTab,
}: IMenuTab): JSX.Element => (
  <button
    role='tab'
    aria-selected={isSelectedTab}
    aria-controls={`panel-${index}`}
    id={`tab-${index}`}
    tabIndex={isSelectedTab ? 0 : -1}
    ref={isSelectedTab ? tabRef : null}
    onClick={() => setSelectedTab(index)}
    className='w-full'
  >
    {children}
  </button>
)

export default Tab
