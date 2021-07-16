import type {IMenuPanel} from 'app/types/components'

const Panel = ({children, index, isSelectedTab}: IMenuPanel): JSX.Element => (
  <section
    id={`panel-${index}`}
    role='tabpanel'
    tabIndex={0}
    aria-labelledby={`tab-${index}`}
    hidden={!isSelectedTab}
    className='h-full'
  >
    {children}
  </section>
)

export default Panel
