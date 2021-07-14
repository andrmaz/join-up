import * as React from 'react'
import dynamic from 'next/dynamic'

import Panel from '@components/navigation/Tablist/Panel'
import PositionContent from '@components/lib/Position/Content'
import {ActionButton} from '@components/form/Button/Action'

const ConfirmDialog = dynamic(
  () => import('@components/notifications/Dialog/Confirmation')
)

import type {PositionOverviewType} from 'app/types/position'

const PositionOverview = ({
  isSelectedTab,
  index,
  position,
}: PositionOverviewType): JSX.Element => {
  const [showDialog, setShowDialog] = React.useState<boolean>(false)
  return (
    <Panel index={index} isSelectedTab={isSelectedTab}>
      <section className='h-full w-full border-2 border-black p-2 rounded'>
        <PositionContent {...position} />
        <article className='h-1/6 flex justify-between'>
          <span className='text-xs'>
            {position.applicants > 0
              ? `This position has ${position.applicants} applicants`
              : 'Be the first to apply this position'}
          </span>
          <div>
            <ActionButton action={() => setShowDialog(true)}>
              Apply
            </ActionButton>
          </div>
        </article>
        <ConfirmDialog
          uid={position.id}
          title='Please confirm your application'
          message='Are you sure you want to apply to this position?'
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      </section>
    </Panel>
  )
}

export default React.memo(PositionOverview)
