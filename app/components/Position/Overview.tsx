import * as React from 'react'
import dynamic from 'next/dynamic'

import Panel from '@components/route/Tablist/Panel'
import PositionContents from '@components/Position/Contents'

const ConfirmApplication = dynamic(
  () => import('@components/Application/Confirm')
)

import type {PositionOverviewType} from 'app/types/position'

const PositionOverview = ({
  isSelectedTab,
  index,
  position,
}: PositionOverviewType): JSX.Element => {
  return (
    <Panel index={index} isSelectedTab={isSelectedTab}>
      <section className='h-full w-full border-2 border-black p-2 rounded'>
        <PositionContents {...position} />
        <article className='h-1/6 flex justify-between'>
          <span className='text-xs'>
            {position.applicants > 0
              ? `This position has ${position.applicants} applicants`
              : 'Be the first to apply this position'}
          </span>
          <div>
            <ConfirmApplication id={position.id} />
          </div>
        </article>
      </section>
    </Panel>
  )
}

export default React.memo(PositionOverview)
