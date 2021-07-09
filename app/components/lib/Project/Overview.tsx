import * as React from 'react'
import type {IProjectData} from 'app/types/project'

function ProjectOverview({
  name,
  description,
  mission,
  projectURL,
  collaborators,
}: IProjectData): React.ReactElement {
  return (
    <div className='h-full w-full border-b-2 border-gray-400 p-1'>
      <header className='h-1/5 w-full flex justify-between'>
        <h2 className='font-black text-xl'>{name}</h2>
      </header>
      <article className='h-4/5 px-1'>
        <small className='h-1/10'>
          {projectURL && <a href={projectURL}>{projectURL}</a>}
        </small>
        <section className='h-3/10'>
          <h3 className='font-extrabold	'>Our mission</h3>
          <p className='h-4/6 text-sm'>{mission}</p>
        </section>
        <section className='h-1/2'>
          <h3 className='font-extrabold	'>Description</h3>
          <p className='h-4/6 text-sm'>{description.substring(0, 500)}...</p>
        </section>
        <span className='h-1/10 text-sm'>
          {collaborators.length
            ? `Collaborators: ${collaborators.toString()}`
            : 'This project has not collaborators yet.'}
        </span>
      </article>
    </div>
  )
}

export default React.memo(ProjectOverview)
