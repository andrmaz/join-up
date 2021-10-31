import * as React from 'react'

import Panel from '@components/route/Tablist/Panel'
import PositionContents from '@components/Position/Contents'
import type {PositionOverviewType} from 'app/types/position'
import dynamic from 'next/dynamic'

const RemovePosition = dynamic(() => import('@components/Position/Remove'))
const EditPosition = dynamic(() => import('@components/Position/Edit'))

const PositionCard = ({
  isSelectedTab,
  index,
  position,
}: PositionOverviewType): JSX.Element => {
  return (
    <Panel index={index} isSelectedTab={isSelectedTab}>
      <section className='h-full w-full border-2 border-black p-2 rounded'>
        <PositionContents {...position} />
        <article className='h-12 flex justify-between'>
          <span className='text-xs'>
            {position.applicants > 0
              ? `This position has ${position.applicants} applicants`
              : 'This position has no applications yet'}
          </span>
          <div className='w-12 flex justify-between'>
            <EditPosition position={position} />
            <RemovePosition id={position.id} />
          </div>
        </article>
      </section>
    </Panel>
  )
}

export default React.memo(PositionCard)
