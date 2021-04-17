import * as React from 'react'
import {useAuthState} from '@hooks/auth/useAuthState'
import PositionModal from '@components/Position/Modal'
import type {IProjectData} from 'app/types/project'

const ProjectBadge = ({
  name,
  projectURL,
  description,
  owner,
}: IProjectData): JSX.Element => {
  const {user} = useAuthState()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  return (
    <div className='h-28 w-full border-b-2 border-gray-400'>
      <header className='h-1/4 w-full flex justify-between'>
        <h2 className='font-black text-xl'>{name}</h2>
        {user?._id === owner && (
          <button
            tabIndex={0}
            className='bg-blue-800 text-white p-1 rounded'
            onClick={() => setShowModal(true)}
          >
            Add a new position
          </button>
        )}
      </header>
      <article className='h-3/4'>
        <a className='text-sm' href={projectURL}>
          {projectURL}
        </a>
        <p className='text-sm'>{description}</p>
      </article>
      <PositionModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default ProjectBadge
