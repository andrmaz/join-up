import * as React from 'react'
import dynamic from 'next/dynamic'
import {useAuthState} from '@hooks/auth/useAuthState'

import {ActionButton} from '@components/form/Button/Action'
import Panel from '@components/navigation/Tablist/Panel'

import {FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'

const RemovePosition = dynamic(
  () => import('@components/features/Remove/Position')
)
const ConfirmDialog = dynamic(
  () => import('@components/notifications/Dialog/Confirmation')
)
const EditPosition = dynamic(() => import('@components/features/Edit/Position'))

import type {IPosistionData, PositionActions} from 'app/types/position'

const PositionOverview = ({
  isSelectedTab,
  index,
  position,
  dispatch,
}: {
  isSelectedTab: boolean
  index: number
  position: IPosistionData
  dispatch: React.Dispatch<PositionActions>
}): JSX.Element => {
  const {user} = useAuthState()
  const [showConfirmDialog, setShowConfirmDialog] =
    React.useState<boolean>(false)
  const [showAlertDialog, setShowAlertDialog] = React.useState<boolean>(false)
  const [showModal, setShowModal] = React.useState<boolean>(false)
  return (
    <Panel index={index} isSelectedTab={isSelectedTab}>
      <div className='h-auto min-h-full w-full border-2 border-black p-2 rounded'>
        <header className='h-16 w-full'>
          <h1 className='font-extrabold text-xl'>{position.title}</h1>
        </header>
        <article className='h-22 flex flex-col justify-evenly text-lg'>
          <span className='h-1/2'>Level: {position.level.label}</span>
          <span className='h-1/2'>Role: {position.role.label}</span>
        </article>
        <main>
          <p className='h-auto py-2'>{position.description}</p>
        </main>
        <article className='h-auto py-2'>
          <p className='text-red-400 break-words'>
            {position.technologies.map(technology => technology.label)}
          </p>
        </article>
        <section className='h-1/10 flex justify-between'>
          <span className='text-xs'>
            {position.applicants > 0
              ? `This position has ${position.applicants} applicants`
              : position.userId !== user?.id
              ? 'Be the first to apply this position'
              : 'This position has no applications yet'}
          </span>
          {position.userId !== user?.id ? (
            <div className='w-1/4'>
              <ActionButton action={() => setShowConfirmDialog(true)}>
                Apply
              </ActionButton>
            </div>
          ) : (
            <div className='w-12 flex justify-between'>
              <FiEdit2
                tabIndex={0}
                onClick={() => setShowModal(true)}
                className='cursor-pointer focus:ring-2 focus:ring-yellow-600'
              />
              <RiDeleteBin6Line
                tabIndex={0}
                onClick={() => setShowAlertDialog(true)}
                className='cursor-pointer focus:ring-2 focus:ring-yellow-600'
              />
            </div>
          )}
        </section>
        <ConfirmDialog
          uid={position.id}
          title='Please confirm your application'
          message='Are you sure you want to apply to this position?'
          showDialog={showConfirmDialog}
          setShowDialog={setShowConfirmDialog}
        />
        <RemovePosition
          uid={position.id}
          showDialog={showAlertDialog}
          setShowDialog={setShowAlertDialog}
          //TODO Create Position Context to avoid props drilling
          dispatch={dispatch}
        />
        <EditPosition
          position={position}
          showModal={showModal}
          setShowModal={setShowModal}
          dispatch={dispatch}
        />
      </div>
    </Panel>
  )
}

export default React.memo(PositionOverview)
