import * as React from 'react'

import type {IPositionData} from 'app/types/position'
import QueryResult from '@components/Result/Query'
import dynamic from 'next/dynamic'
import {trpc} from '@utils/trpc'

const PositionOverview = dynamic(() => import('@screens/Position/Overview'))
const PositionCard = dynamic(() => import('@screens/Position/Card'))

const PositionPanels = ({
  positions,
  selectedTab,
}: {
  positions: IPositionData[]
  selectedTab: number
}): React.ReactElement => {
  const {status, error, data} = trpc.user.detail.useQuery()

  return (
    <main className='h-auto w-full overflow-y-scroll'>
      <QueryResult status={status} error={error} data={data}>
        {({user}) =>
          positions.map((position, index) => {
            return user.id === position.userId.toString() ? (
              <PositionCard
                isSelectedTab={selectedTab === index}
                index={index}
                position={position}
                key={position.id}
              />
            ) : (
              <PositionOverview
                isSelectedTab={selectedTab === index}
                index={index}
                position={position}
                key={position.id}
              />
            )
          })
        }
      </QueryResult>
    </main>
  )
}

export default React.memo(PositionPanels)
