import * as React from 'react'
import dynamic from 'next/dynamic'
import {useAuthState} from '@hooks/auth/useAuthState'

const PositionOverview = dynamic(
  () => import('@components/lib/Position/Overview')
)
const PositionCard = dynamic(() => import('@components/lib/Position/Card'))

import type {IPositionData} from 'app/types/position'

const PositionPanels = ({
  positions,
  selectedTab,
}: {
  positions: IPositionData[]
  selectedTab: number
}): React.ReactElement => {
  const {user} = useAuthState()
  return (
    <main className='h-full w-full overflow-y-scroll'>
      {positions.map((position, index) => {
        return user?.id === position.userId ? (
          <PositionCard
            key={position.id}
            isSelectedTab={selectedTab === index}
            index={index}
            position={position}
          />
        ) : (
          <PositionOverview
            key={position.id}
            isSelectedTab={selectedTab === index}
            index={index}
            position={position}
          />
        )
      })}
    </main>
  )
}

export default React.memo(PositionPanels)
