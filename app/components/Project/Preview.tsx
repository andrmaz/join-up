import type {IProjectData} from 'app/types/project'
import Link from 'next/link'

const ProjectPreview = ({
  id,
  name,
  hasPositions,
  description,
  technologies,
  collaborators,
}: IProjectData): JSX.Element => {
  return (
    <li className='h-40 p-1 mx-2 border-gray-300 border-2 rounded'>
      <header className='h-1/5 font-extrabold'>
        <Link href={`/projects/${id}`}>
          <a className='cursor-pointer hover:opacity-60'>{name}</a>
        </Link>
      </header>
      <article className='h-2/5 text-sm'>
        <p>{description?.slice(0, 200)}</p>
      </article>
      <article className='h-1/5 overflow-x-scroll'>
        <span className='text-red-600'>{technologies.toString()}</span>
      </article>
      <article className='h-1/5 flex flex-row justify-start'>
        {hasPositions ? (
          <div className='h-3 w-3 bg-green-800 rounded-full' />
        ) : (
          <div className='h-3 w-3 bg-red-600 rounded-full' />
        )}
        <span>{collaborators}</span>
      </article>
    </li>
  )
}

export default ProjectPreview
