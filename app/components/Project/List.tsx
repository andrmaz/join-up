import ProjectCard from '@components/Project/Item'
import {MessageEmpty} from '@components/Message/Empty'
import type {IProjectData} from 'app/types/project'

const ProjectsList = ({
  projects,
}: {
  projects: IProjectData[]
}): React.ReactElement => {
  return (
    <section>
      {projects.length ? (
        <ul className='flex flex-col'>
          {projects.map((project: IProjectData) => (
            <ProjectCard key={project._id} {...project} />
          ))}
        </ul>
      ) : (
        <MessageEmpty />
      )}
    </section>
  )
}

export default ProjectsList
