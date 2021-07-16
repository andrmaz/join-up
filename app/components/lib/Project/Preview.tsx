import * as React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const RemoveProject = dynamic(() => import('@components/lib/Project/Remove'))
const EditProject = dynamic(() => import('@components/lib/Project/Edit'))

import type {IProjectData} from 'app/types/project'

const ProjectPreview = ({
  project,
}: {
  project: IProjectData
}): React.ReactElement => {
  return (
    <li className='h-48 p-1 mx-2 border-gray-300 border-2 rounded'>
      <header className='h-1/5 font-extrabold'>
        <Link href={`/projects/${project.id}`}>
          <a className='cursor-pointer hover:opacity-60'>{project.name}</a>
        </Link>
      </header>
      <section className='h-4/5'>
        <article className='h-1/5 flex justify-between text-sm'>
          <small className='w-1/2'>
            Created at {project.createdAt.slice(0, 7)}{' '}
          </small>
          <small className='w-1/2'>
            Updated at {project.updatedAt.slice(0, 7)}{' '}
          </small>
        </article>
        <p className='h-1/5 font-bold text-xs truncate'>
          {project.description}
        </p>
        <article className='h-2/5 text-sm'>
          Technologies :{' '}
          <small className='text-red-600'>
            {project.technologies?.map(technology => `${technology.label},`)}
          </small>
        </article>
        <article className='h-1/5 flex pr-1 justify-between'>
          <span className='text-xs italic'>
            This project{' '}
            {project.hasPositions ? 'has one or more' : 'has not any'} positions
            available
          </span>
          <div className='w-10 flex justify-between'>
            <EditProject project={project} />
            <RemoveProject uid={project.id} />
          </div>
        </article>
      </section>
    </li>
  )
}

export default ProjectPreview
