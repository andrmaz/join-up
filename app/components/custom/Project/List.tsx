import Link from 'next/link'
import ProjectPreview from '@components/custom/Project/Preview'
import {EmptyMessage} from '@components/alerts/Message/Empty'
import type {IProjectData} from 'app/types/project'

const ProjectsList = ({
  projects,
}: {
  projects: IProjectData[]
}): React.ReactElement => {
  return (
    <section className='pt-12'>
      {projects.length ? (
        <ul className='flex flex-col'>
          {projects.map((project: IProjectData) => (
            <ProjectPreview key={project.id} {...project} />
          ))}
        </ul>
      ) : (
        <EmptyMessage>
          It seems there is not any project yet. <br />
          Click{' '}
          <Link href='/new/project'>
            <a className='underline'>here</a>
          </Link>{' '}
          to create your first project
        </EmptyMessage>
      )}
    </section>
  )
}

export default ProjectsList
