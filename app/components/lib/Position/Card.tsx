import * as React from 'react'
import dynamic from 'next/dynamic'

import Panel from '@components/navigation/Tablist/Panel'
import PositionContent from '@components/lib/Position/Content'

const RemovePosition = dynamic(() => import('@components/lib/Remove/Position'))
const EditPosition = dynamic(() => import('@components/lib/Edit/Position'))

import type {PositionOverviewType} from 'app/types/position'

const PositionCard = ({
  isSelectedTab,
  index,
  position,
}: PositionOverviewType): JSX.Element => {
  return (
    <Panel index={index} isSelectedTab={isSelectedTab}>
      <section className='h-full w-full border-2 border-black p-2 rounded'>
        <PositionContent {...position} />
        <article className='h-1/6 flex justify-between'>
          <span className='text-xs'>
            {position.applicants > 0
              ? `This position has ${position.applicants} applicants`
              : 'This position has no applications yet'}
          </span>
          <div className='w-12 flex justify-between'>
            <EditPosition position={position} />
            <RemovePosition uid={position.id} />
          </div>
        </article>
      </section>
    </Panel>
  )
}

export default React.memo(PositionCard)
