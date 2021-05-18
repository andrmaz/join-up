import {ActionButton} from '@components/form/Button/Action'
import type {IProjectData} from 'app/types/project'
import Link from 'next/link'

const ProjectPreview = ({
  id,
  name,
  hasPositions,
  description,
  technologies,
  createdAt,
  updatedAt,
}: IProjectData): JSX.Element => {
  return (
    <li className='h-48 p-1 mx-2 border-gray-300 border-2 rounded'>
      <header className='h-1/5 font-extrabold'>
        <Link href={`/projects/${id}`}>
          <a className='cursor-pointer hover:opacity-60'>{name}</a>
        </Link>
      </header>
      <article className='h-4/5 text-sm'>
        <div className='h-1/5 flex justify-between'>
          <span className='w-1/2'>Created at {createdAt.slice(0, 7)} </span>
          <span className='w-1/2'>Updated at {updatedAt.slice(0, 7)} </span>
        </div>
        <p className='h-1/5 truncate'>{description}</p>
        <div className='h-2/5'>
          Technologies :{' '}
          <span className='text-red-600'>{technologies.toString()}</span>
        </div>
        <div className='h-1/5 flex justify-between'>
          <span>
            This project {hasPositions ? 'has one or more' : 'has not any'}{' '}
            positions available
          </span>
          <div className='w-1/6'>
            <ActionButton action={() => console.log('Edit')}>Edit</ActionButton>
          </div>
        </div>
      </article>
    </li>
  )
}

export default ProjectPreview
