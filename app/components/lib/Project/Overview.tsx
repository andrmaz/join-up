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
        <h2 className='font-black text-xl'>{name.toUpperCase()}</h2>
      </header>
      <section className='h-4/5 px-1'>
        <aside className='h-1/10 flex justify-between'>
          <span className='text-sm italic'>
            {collaborators.length
              ? `Collaborators: ${collaborators.toString()}`
              : 'This project has not collaborators yet.'}
          </span>
          <span>
            {projectURL && (
              <a href={projectURL} className='underline text-blue-600'>
                {projectURL}
              </a>
            )}
          </span>
        </aside>
        <main className='h-4/5'>
          <section className='h-auto'>
            <h3 className='font-extrabold	'>Our mission</h3>
            <p className='h-4/6 text-sm'>{mission.substring(0, 400)}...</p>
          </section>
          <section className='h-auto'>
            <h3 className='font-extrabold	'>Description</h3>
            <p className='h-4/6 text-sm'>{description.substring(0, 400)}...</p>
          </section>
        </main>
      </section>
    </div>
  )
}

export default React.memo(ProjectOverview)
