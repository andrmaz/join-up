import ProjectCard from '@components/Project/Card'
import type {AsyncData} from 'app/types/async'
import type {UserData} from 'app/types/user'
import type {IProjectData} from 'app/types/project'

const ProjectsGrid = ({
  status,
  projects,
  currentUser,
}: {
  status: string
  projects: AsyncData
  currentUser: UserData
}): JSX.Element => (
  <section className='w-200 h-auto'>
    <div className='grid grid-cols-2 xl:grid-cols-3 gap-4 py-2 px-1'>
      {!projects ? (
        <span>No match found</span>
      ) : status === 'resolved' ? (
        projects
          /*//TODO: Filter projects on server before receiving the response */
          .filter((project: IProjectData) => project.owner !== currentUser?._id)
          .map((project: IProjectData) => (
            <ProjectCard key={project._id} {...project} />
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
