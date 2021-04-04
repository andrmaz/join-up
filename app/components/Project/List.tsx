import ProjectCard from '@components/Project/Item'
import {EmptyMessage} from '@components/Project/EmptyMessage'
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
            <ProjectCard key={project._id} {...project} />
          ))}
        </ul>
      ) : (
        <EmptyMessage />
      )}
    </section>
  )
}

export default ProjectsList
