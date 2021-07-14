import * as React from 'react'
import dynamic from 'next/dynamic'

import Panel from '@components/navigation/Tablist/Panel'
import PositionContent from '@components/lib/Position/Content'

import {FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'

const RemovePosition = dynamic(() => import('@components/lib/Remove/Position'))
const EditPosition = dynamic(() => import('@components/lib/Edit/Position'))

import type {PositionOverviewType} from 'app/types/position'

const PositionCard = ({
  isSelectedTab,
  index,
  position,
}: PositionOverviewType): JSX.Element => {
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [showDialog, setShowDialog] = React.useState<boolean>(false)
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
            <FiEdit2
              tabIndex={0}
              onClick={() => setShowModal(true)}
              className='cursor-pointer focus:ring-2 focus:ring-yellow-600'
            />
            <RiDeleteBin6Line
              tabIndex={0}
              onClick={() => setShowDialog(true)}
              className='cursor-pointer focus:ring-2 focus:ring-yellow-600'
            />
          </div>
        </article>
        <RemovePosition
          uid={position.id}
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
        <EditPosition
          position={position}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </section>
    </Panel>
  )
}

export default React.memo(PositionCard)
