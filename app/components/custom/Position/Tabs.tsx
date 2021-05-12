import * as React from 'react'
import PositionTab from '@components/custom/Position/Tab'
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
    <section className='w-full h-full p-1 overflow-y-scroll'>
      <ul
        role='tablist'
        aria-label='tabs'
        onKeyDown={handleKeyPress}
        className='h-full'
      >
        {positions.map((position, index) => (
          <PositionTab
            key={position.id}
            index={index}
            isSelectedTab={selectedTab === index}
            setSelectedTab={setSelectedTab}
            tabRef={tabRef}
            position={position}
          />
        ))}
      </ul>
    </section>
  )
}

export default React.memo(PositionTabs)
