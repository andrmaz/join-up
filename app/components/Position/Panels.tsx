import * as React from 'react'
import PositionPanel from '@components/Position/Panel'
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
        <PositionPanel
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
