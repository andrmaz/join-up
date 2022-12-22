import * as React from 'react'

import type {IProjectData} from 'app/types/project'
import Link from 'next/link'

const ProjectCard = ({
  id,
  name,
  mission,
  technologies,
  updated_at,
}: IProjectData): JSX.Element => {
  return (
    <section className='h-48 w-full border-2 border-black p-1 rounded'>
      <header className='h-1/6  font-bold'>
        <Link href={`/projects/${id}`}>
          <a className='cursor-pointer hover:opacity-60 overflow-x-hidden'>
            {name}
          </a>
        </Link>
      </header>
      <main className='h-3/6'>
        <span className='h-1/6 text-xs'>
          Last update:{' '}
          <small className='italic'>{updated_at.slice(0, 7)}</small>
        </span>
        <p className='h-5/6 text-sm tracking-wide overflow-hidden'>{mission}</p>
      </main>
      <aside className='h-2/6 w-full pt-2 overflow-hidden'>
        <span className='text-xs break-words text-red-400'>
          {technologies?.map(technology => `${technology.label},`)}
        </span>
      </aside>
    </section>
  )
}

export default React.memo(ProjectCard)
