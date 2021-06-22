import * as React from 'react'
import PositionOverview from '@components/features/Position/Overview'
import type {IPosistionData, PositionActions} from 'app/types/position'

const PositionPanels = ({
  positions,
  selectedTab,
  dispatch,
}: {
  positions: IPosistionData[]
  selectedTab: number
  dispatch: React.Dispatch<PositionActions>
}): React.ReactElement => {
  return (
    <main className='h-full w-full overflow-y-scroll'>
      {positions.map((position, index) => (
        <PositionOverview
          key={position.id}
          isSelectedTab={selectedTab === index}
          index={index}
          position={position}
          dispatch={dispatch}
        />
      ))}
    </main>
  )
}

export default React.memo(PositionPanels)
