import ProjectCard from '@components/Card/Card'
import {useAuthState} from '@hooks/auth/useAuthState'
import {EmptyMessage} from '../Message/Empty'
import type {IProjectData} from 'app/types/project'

const ProjectOverview = ({project}: {project: IProjectData}): JSX.Element => {
  const {user} = useAuthState()
  return (
    <div className='w-full h-full border-2 border-black p-4'>
      <article className='w-full h-auto'>
        <ProjectCard {...project} />
      </article>
      <article className='w-full h-1/2'>
        {project.jobsAvailable ? (
          //* Map through posts list
          <ul>Posts</ul>
        ) : (
          <EmptyMessage>This project has no posts available.</EmptyMessage>
        )}
        <div className='w-full flex justify-end'>
          {project.owner === user?._id && (
            <button onClick={() => console.log('Adding a new post')}>
              Add a new post
            </button>
          )}
        </div>
      </article>
    </div>
  )
}

export default ProjectOverview
