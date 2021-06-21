import * as React from 'react'
import dynamic from 'next/dynamic'
import {useAuthState} from '@hooks/auth/useAuthState'

import {ActionButton} from '@components/form/Button/Action'
import Panel from '@components/navigation/Tablist/Panel'
const ConfirmDialog = dynamic(
  () => import('@components/notifications/Dialog/Confirmation')
)

import type {IPosistionData} from 'app/types/position'

const PositionOverview = ({
  isSelectedTab,
  index,
  position: {
    id,
    title,
    description,
    technologies,
    level,
    role,
    userId,
    applicants,
  },
}: {
  isSelectedTab: boolean
  index: number
  position: IPosistionData
}): JSX.Element => {
  const {user} = useAuthState()
  const [showDialog, setShowDialog] = React.useState<boolean>(false)
  return (
    <Panel index={index} isSelectedTab={isSelectedTab}>
      <div className='h-auto w-full border-2 border-black p-2 rounded'>
        <header className='h-16 w-full'>
          <h1 className='font-extrabold text-xl'>{title}</h1>
        </header>
        <article className='h-22 flex flex-col justify-evenly text-lg'>
          <span className='h-1/2'>Level: {level}</span>
          <span className='h-1/2'>Role: {role}</span>
        </article>
        <main>
          <p className='h-auto py-2'>{description}</p>
        </main>
        <article className='h-auto py-2'>
          <p className='text-red-400 break-words'>
            {technologies.map(technology => technology.label)}
          </p>
        </article>
        <section className='h-1/10 flex justify-between'>
          <span className='text-xs'>
            {applicants > 0
              ? `This position has ${applicants} applicant/s`
              : userId !== user?.id && 'Be the first to apply this position'}
          </span>
          <div className='w-1/4'>
            {userId !== user?.id && (
              <ActionButton action={() => setShowDialog(true)}>
                Apply
              </ActionButton>
            )}
          </div>
        </section>
        <ConfirmDialog
          uid={id}
          title='Please confirm your application'
          message='Are you sure you want to apply to this position?'
          showDialog={showDialog}
          setShowDialog={setShowDialog}
        />
      </div>
    </Panel>
  )
}

export default React.memo(PositionOverview)
