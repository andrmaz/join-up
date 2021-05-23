import * as React from 'react'
import Link from 'next/link'
import type {IProjectData} from 'app/types/project'

const ProjectCard = ({
  id,
  name,
  description,
  technologies,
  updatedAt,
}: IProjectData): JSX.Element => {
  return (
    <div className='h-48 w-full border-2 border-black p-1 rounded'>
      <header className='h-1/6'>
        <Link href={`/projects/${id}`}>
          <a className='cursor-pointer hover:opacity-60 overflow-x-hidden'>
            {name}
          </a>
        </Link>
      </header>
      <article className='h-3/6'>
        <span className='h-1/6 text-xs'>
          Last update: {updatedAt.slice(0, 7)}
        </span>
        <p className='h-5/6 text-sm tracking-tighter overflow-hidden'>
          {description}
        </p>
      </article>
      <aside className='h-2/6 w-full pt-2 overflow-hidden'>
        <span className='text-xs break-words text-red-400'>
          {technologies?.map(technology => `${technology.label},`)}
        </span>
      </aside>
    </div>
  )
}

export default React.memo(ProjectCard)
