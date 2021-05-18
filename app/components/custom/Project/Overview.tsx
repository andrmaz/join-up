import * as React from 'react'
import {useAuthState} from '@hooks/auth/useAuthState'
import PositionModal from '@components/custom/Position/Modal'
import {ActionButton} from '@components/form/Button/Action'
import type {IProjectData} from 'app/types/project'

function ProjectOverview({
  name,
  description,
  projectURL,
  owner,
  collaborators,
}: IProjectData): React.ReactElement {
  const {user} = useAuthState()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  return (
    <div className='h-full w-full border-b-2 border-gray-400 p-1'>
      <header className='h-1/5 w-full flex justify-between'>
        <h2 className='font-black text-xl'>{name}</h2>
        <div className='w-1/5'>
          {user?.id === owner && (
            <ActionButton tabIndex={0} action={() => setShowModal(true)}>
              Add a new position
            </ActionButton>
          )}
        </div>
      </header>
      <article className='h-4/5'>
        {projectURL ? (
          <a className='h-1/6' href={projectURL}>
            Url: {projectURL}
          </a>
        ) : (
          <span className='h-1/6'>This project has not a url yet.</span>
        )}
        <p className='h-4/6 py-1 text-sm'>{description}</p>
        <span className='h-1/6'>
          {collaborators.length
            ? `Collaborators: ${collaborators.toString()}`
            : 'This project has not collaborators yet.'}
        </span>
      </article>
      <PositionModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default React.memo(ProjectOverview)
