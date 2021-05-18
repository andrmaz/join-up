import * as React from 'react'
import PositionPreview from '@components/custom/Position/Preview'
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
    <nav className='w-full h-full p-1 overflow-y-scroll'>
      <ul
        role='tablist'
        aria-label='tabs'
        onKeyDown={handleKeyPress}
        className='h-full'
      >
        {positions.map((position, index) => (
          <PositionPreview
            key={position.id}
            index={index}
            isSelectedTab={selectedTab === index}
            setSelectedTab={setSelectedTab}
            tabRef={tabRef}
            position={position}
          />
        ))}
      </ul>
    </nav>
  )
}

export default React.memo(PositionTabs)
