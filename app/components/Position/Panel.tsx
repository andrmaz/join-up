import * as React from 'react'
import {useAuthState} from '@hooks/auth/useAuthState'

import {ActionButton} from '@components/Button/Action'
import Portal from '@components/Portal/Portal'
import ConfirmDialog from '@components/Dialog/Confirm'

import type {IPosistionData} from 'app/types/position'

const PositionPanel = ({
  id,
  title,
  description,
  technologies,
  vacancies,
  level,
  role,
  userId,
  createdAt,
  updatedAt,
}: IPosistionData): JSX.Element => {
  const {user} = useAuthState()
  const [showDialog, setShowDialog] = React.useState<boolean>(false)
  return (
    <div className='h-full w-full border-2 border-black p-2 rounded'>
      <header className='h-1/10 w-full'>
        <h1 className='font-extrabold text-xl'>{title}</h1>
      </header>
      <article className='h-4/5 flex flex-col justify-evenly text-lg'>
        <span className='h-1/10'>Created at: {createdAt.slice(0, 7)}</span>
        <span className='h-1/10'>Positions available: {vacancies}</span>
        <span className='h-1/10'>Level: {level}</span>
        <span className='h-1/10'>Role: {role}</span>
        <p className='h-2/5'>{description.slice(0, 300)}</p>
        <p className='h-1/5 text-red-400 break-words'>
          {technologies?.toString()}
        </p>
      </article>
      <aside className='h-1/10 flex justify-between'>
        <span>
          Last update:
          {updatedAt.slice(0, 7)}
        </span>
        <div className='w-1/4'>
          {userId !== user?.id && (
            <ActionButton action={() => setShowDialog(true)}>
              Apply
            </ActionButton>
          )}
        </div>
      </aside>
      {showDialog && (
        <Portal>
          <ConfirmDialog
            uid={id}
            title='Please confirm your application'
            message='Are you sure you want to apply to this position?'
            setShowDialog={setShowDialog}
          />
        </Portal>
      )}
    </div>
  )
}

export default PositionPanel
