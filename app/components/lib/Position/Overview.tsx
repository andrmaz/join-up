import * as React from 'react'
import dynamic from 'next/dynamic'
import {useAuthState} from '@hooks/auth/useAuthState'

import {ActionButton} from '@components/form/Button/Action'
import Panel from '@components/navigation/Tablist/Panel'

import {FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'

const RemovePosition = dynamic(() => import('@components/lib/Remove/Position'))
const ConfirmDialog = dynamic(
  () => import('@components/notifications/Dialog/Confirmation')
)
const EditPosition = dynamic(() => import('@components/lib/Edit/Position'))

import type {PositionOverviewType} from 'app/types/position'

const PositionOverview = ({
  isSelectedTab,
  index,
  position,
}: PositionOverviewType): JSX.Element => {
  const {user} = useAuthState()
  const [showConfirmDialog, setShowConfirmDialog] =
    React.useState<boolean>(false)
  const [showAlertDialog, setShowAlertDialog] = React.useState<boolean>(false)
  const [showModal, setShowModal] = React.useState<boolean>(false)
  return (
    <Panel index={index} isSelectedTab={isSelectedTab}>
      <section className='h-full w-full border-2 border-black p-2 rounded'>
        <header className='h-1/6 w-full'>
          <h1 className='font-extrabold text-xl'>{position.title}</h1>
        </header>
        <main className='h-5/6'>
          <article className='h-1/6 flex flex-col justify-evenly text-lg'>
            <p className='h-1/2'>
              <span className='font-semibold'>Level: </span>
              <small className='italic'>{position.level.label}</small>
            </p>
            <p className='h-1/2'>
              <span className='font-semibold'>Role: </span>
              <small className='italic'>{position.role.label}</small>
            </p>
          </article>
          <article className='h-3/6'>
            <div className='h-auto'>
              <h3 className='font-extrabold	'>What you&apos;ll do</h3>
              <p className='h-4/6 text-sm'>{position.duties}</p>
            </div>
            <div className='h-auto'>
              <h3 className='font-extrabold	'>Basic qualifications</h3>
              <p className='h-4/6 text-sm'>{position.qualifications}</p>
            </div>
          </article>
          <article className='h-1/6 py-2'>
            <p className='text-red-400 break-words'>
              {position.technologies.map(technology => technology.label)}
            </p>
          </article>
          <article className='h-1/6 flex justify-between'>
            <span className='text-xs'>
              {position.applicants > 0
                ? `This position has ${position.applicants} applicants`
                : position.userId !== user?.id
                ? 'Be the first to apply this position'
                : 'This position has no applications yet'}
            </span>
            {position.userId !== user?.id ? (
              <div>
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
          </article>
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
          />
          <EditPosition
            position={position}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </main>
      </section>
    </Panel>
  )
}

export default React.memo(PositionOverview)
