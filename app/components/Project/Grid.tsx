import ProjectCard from '@components/Project/Card'
import type {AsyncData} from 'app/types/async'
import type {IProjectData} from 'app/types/project'

const ProjectsGrid = ({
  status,
  projects,
}: {
  status: string
  projects: AsyncData
}): JSX.Element => (
  <section className='w-200 min-h-screen h-auto'>
    <div className='grid grid-cols-2 xl:grid-cols-3 gap-4 py-2 px-1'>
      {!projects?.length ? (
        <span>No match found</span>
      ) : status === 'resolved' ? (
        projects.map((project: IProjectData) => (
          <ProjectCard key={project.id} {...project} />
        ))
      ) : status === 'pending' ? (
        <span>Loading ...</span>
      ) : (
        status === 'rejected' && <span>Something went wrong</span>
      )}
    </div>
  </section>
)

export default ProjectsGrid
