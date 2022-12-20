import * as React from 'react'

import {EmptyMessage} from '@lib/Message/Empty'
import PositionTablist from './Tablist'
import {QueryResult} from '@components/Result/Query'
import {trpc} from '@utils/trpc'

export const PositionList = ({id}: {id: number}): React.ReactElement => {
  const {status, error, data} = trpc.position.list.useQuery({id})

  return (
    <QueryResult status={status} error={error} data={data}>
      {({response: {positions}}) => {
        positions.length ? (
          <PositionTablist positions={positions} />
        ) : (
          <EmptyMessage>This project has no positions yet.</EmptyMessage>
        )
      }}
    </QueryResult>
  )
}
