import * as React from 'react'
import {useAuthState} from '@hooks/auth/useAuthState'
import PositionModal from '@components/Position/Modal'
import type {IProjectData} from 'app/types/project'

const ProjectBadge = ({
  name,
  description,
  projectURL,
  owner,
}: IProjectData): JSX.Element => {
  const {user} = useAuthState()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  return (
    <div className='h-full w-full border-b-2 border-gray-400 p-1'>
      <header className='h-2/5 w-full flex justify-between'>
        <h2 className='font-black text-xl'>{name}</h2>
        {user?.id === owner && (
          <button
            tabIndex={0}
            className='h-8 bg-blue-800 text-white p-1 rounded'
            onClick={() => setShowModal(true)}
          >
            Add a new position
          </button>
        )}
      </header>
      <article className='h-3/5'>
        <a className='text-sm' href={projectURL}>
          {projectURL}
        </a>
        <p className='text-sm'>{description?.slice(0, 350)}</p>
      </article>
      <PositionModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default ProjectBadge
