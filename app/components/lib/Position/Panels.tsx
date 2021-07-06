import * as React from 'react'
import dynamic from 'next/dynamic'
//import PositionOverview from '@components/features/Position/Overview'
import type {IPosistionData} from 'app/types/position'
const PositionOverview = dynamic(
  () => import('@components/lib/Position/Overview')
)

const PositionPanels = ({
  positions,
  selectedTab,
}: {
  positions: IPosistionData[]
  selectedTab: number
}): React.ReactElement => {
  return (
    <main className='h-full w-full overflow-y-scroll'>
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
