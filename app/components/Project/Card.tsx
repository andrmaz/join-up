import Link from 'next/link'
import type {IProjectData} from 'app/types/project'

const ProjectCard = ({
  id,
  name,
  description,
  projectURL,
  technologies,
  updatedAt,
}: IProjectData): JSX.Element => {
  return (
    <div className='h-48 w-full border-2 border-black p-1 rounded'>
      <header className='h-1/6 w-full inline-flex justify-between'>
        <Link href={`/projects/${id}`}>
          <a className='cursor-pointer hover:opacity-60 overflow-x-hidden'>
            {name}
          </a>
        </Link>
        <div className='text-xs flex flex-col'>
          <span>Last update:</span>
          <span>{updatedAt.slice(0, 7)}</span>
        </div>
      </header>
      <article className='h-4/6'>
        <a className='text-xs' href={projectURL}>
          {projectURL}
        </a>
        <p className='text-sm'>{description?.slice(0, 100)}</p>
      </article>
      <aside className='h-1/6'>
        <div className='h-1/2 text-xs text-red-400 overflow-x-scroll'>
          {technologies.toString()}
        </div>
      </aside>
    </div>
  )
}

export default ProjectCard
