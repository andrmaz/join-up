import * as React from 'react'

import type {IPositionData} from 'app/types/position'
import dynamic from 'next/dynamic'
import {useAuthState} from '@hooks/auth/useAuthState'

const PositionOverview = dynamic(() => import('@screens/Position/Overview'))
const PositionCard = dynamic(() => import('@screens/Position/Card'))

const PositionPanels = ({
  positions,
  selectedTab,
}: {
  positions: IPositionData[]
  selectedTab: number
}): React.ReactElement => {
  const {user} = useAuthState()
  return (
    <main className='h-auto w-full overflow-y-scroll'>
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
