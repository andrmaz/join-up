import * as React from 'react'
import {useTabsKey} from '@hooks/tabs/useTabsKey'
import PositionPreview from '@components/lib/Position/Preview'
import type {PositionTabsType} from 'app/types/position'

const PositionTabs = ({
  positions,
  selectedTab,
  setSelectedTab,
}: PositionTabsType): React.ReactElement => {
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
