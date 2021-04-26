import PositionTab from '@components/Position/Tab'
import {useTabsKey} from '@hooks/tabs/useTabsKey'
import type {IPosistionData} from 'app/types/position'

const PositionTabs = ({
  positions,
  selectedTab,
  setSelectedTab,
}: {
  positions: IPosistionData[]
  selectedTab: number
  setSelectedTab: (position: number) => void
}): React.ReactElement => {
  const [handleKeyPress, tabRef] = useTabsKey(
    positions.length - 1,
    selectedTab,
    setSelectedTab
  )
  return (
    <section className='w-full h-5/6 p-1 overflow-y-scroll'>
      <ul
        role='tablist'
        aria-label='tabs'
        onKeyDown={handleKeyPress}
        className='h-full'
      >
        {positions.map((position, index) => (
          <button
            key={position.id}
            role='tab'
            aria-selected={selectedTab === index}
            aria-controls={`panel-${index}`}
            id={`tab-${index}`}
            tabIndex={selectedTab === index ? 0 : -1}
            ref={selectedTab === index ? tabRef : null}
            onClick={() => setSelectedTab(index)}
            className='w-full'
          >
            <PositionTab {...position} />
          </button>
        ))}
      </ul>
    </section>
  )
}

export default PositionTabs
