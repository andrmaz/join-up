import * as React from 'react'
import ProjectCard from '@components/lib/Project/Card'
import type {AsyncDataType, AsyncStatusType} from 'app/types/async'
import type {IProjectData} from 'app/types/project'

const ProjectsGrid = ({
  status,
  projects,
}: {
  status: AsyncStatusType
  projects: AsyncDataType
}): JSX.Element => {
  const isIdle = status == 'idle'
  const isPending = status === 'pending'
  const isRejected = status === 'rejected'
  const isSuccess = status === 'resolved'
  //TODO Implement Error Boundary
  if (isRejected) return <div>Something went wrong</div>
  return (
    <section className='w-200 min-h-screen h-auto'>
      <div className='grid grid-cols-2 xl:grid-cols-3 gap-4 py-2 px-1'>
        {isPending || isIdle ? (
          <span>Loading projects...</span>
        ) : (
          isSuccess &&
          (!projects?.length ? (
            <span>No match found</span>
          ) : (
            projects.map((project: IProjectData) => (
              <ProjectCard key={project.id} {...project} />
            ))
          ))
        )}
      </div>
    </section>
  )
}

export default React.memo(ProjectsGrid)
