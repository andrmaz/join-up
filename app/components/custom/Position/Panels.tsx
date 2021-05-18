import * as React from 'react'
import PositionOverview from '@components/custom/Position/Overview'
import type {IPosistionData} from 'app/types/position'

const PositionPanels = ({
  positions,
  selectedTab,
}: {
  positions: IPosistionData[]
  selectedTab: number
}): React.ReactElement => {
  return (
    <main className='h-full w-full'>
      {positions.map((position, index) => (
        <PositionOverview
          key={position.id}
          isSelectedTab={selectedTab === index}
          index={index}
          position={position}
        />
      ))}
    </main>
  )
}

export default React.memo(PositionPanels)
