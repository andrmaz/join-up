import * as React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import {FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'

const ProjectModal = dynamic(() => import('@components/custom/Project/Modal'))
const DeleteDialog = dynamic(
  () => import('@components/containers/Dialog/Alert')
)

import type {IProjectData} from 'app/types/project'

const ProjectPreview = ({project}: {project: IProjectData}): JSX.Element => {
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [showDialog, setShowDialog] = React.useState<boolean>(false)
  return (
    <li className='h-48 p-1 mx-2 border-gray-300 border-2 rounded'>
      <header className='h-1/5 font-extrabold'>
        <Link href={`/projects/${project.id}`}>
          <a className='cursor-pointer hover:opacity-60'>{project.name}</a>
        </Link>
      </header>
      <article className='h-4/5 text-sm'>
        <div className='h-1/5 flex justify-between'>
          <span className='w-1/2'>
            Created at {project.createdAt.slice(0, 7)}{' '}
          </span>
          <span className='w-1/2'>
            Updated at {project.updatedAt.slice(0, 7)}{' '}
          </span>
        </div>
        <p className='h-1/5 truncate'>{project.description}</p>
        <div className='h-2/5'>
          Technologies :{' '}
          <span className='text-red-600'>
            {project.technologies?.map(technology => `${technology.label},`)}
          </span>
        </div>
        <div className='h-1/5 flex pr-1 justify-between'>
          <span>
            This project{' '}
            {project.hasPositions ? 'has one or more' : 'has not any'} positions
            available
          </span>
          <div className='w-10 flex justify-between'>
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
        </div>
      </article>
      <ProjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        project={project}
      />
      <DeleteDialog
        id={project.id}
        title='Delete this project'
        message='Are you sure you want to delete this project?'
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </li>
  )
}

export default ProjectPreview
