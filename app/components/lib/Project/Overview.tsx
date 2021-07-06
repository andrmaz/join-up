import * as React from 'react'
import type {IProjectData} from 'app/types/project'

function ProjectOverview({
  name,
  description,
  projectURL,
  collaborators,
}: IProjectData): React.ReactElement {
  return (
    <div className='h-full w-full border-b-2 border-gray-400 p-1'>
      <header className='h-1/5 w-full flex justify-between'>
        <h2 className='font-black text-xl'>{name}</h2>
      </header>
      <article className='h-4/5'>
        {projectURL ? (
          <a className='h-1/6' href={projectURL}>
            Url: {projectURL}
          </a>
        ) : (
          <span className='h-1/6'>This project has not a url yet.</span>
        )}
        <p className='h-4/6 py-1 text-sm'>{description}</p>
        <span className='h-1/6'>
          {collaborators.length
            ? `Collaborators: ${collaborators.toString()}`
            : 'This project has not collaborators yet.'}
        </span>
      </article>
    </div>
  )
}

export default React.memo(ProjectOverview)
