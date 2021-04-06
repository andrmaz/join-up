import ProjectCard from '@components/Card/Card'
import {useAuthState} from '@hooks/useAuthState'
import {SubmitButton} from '@components/Button/Submit'
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
        {project.collaborators.length ? (
          <span>Posts</span>
        ) : (
          <EmptyMessage>This project has no posts available.</EmptyMessage>
        )}
        <div className='w-full flex justify-end'>
          {project.owner === user?._id && (
            <SubmitButton value='Add a new post' errors={false} />
          )}
        </div>
      </article>
    </div>
  )
}

export default ProjectOverview
