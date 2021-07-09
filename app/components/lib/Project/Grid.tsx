import * as React from 'react'
import ProjectCard from '@components/lib/Project/Card'
import type {ProjectGridType} from 'app/types/project'

const ProjectsGrid = ({
  isIdle,
  isLoading,
  isError,
  isSuccess,
  data,
}: ProjectGridType): JSX.Element => {
  //TODO Implement Error Boundary
  if (isError) return <div>Something went wrong</div>
  return (
    <section className='w-200 min-h-screen h-auto'>
      <div className='grid grid-cols-2 xl:grid-cols-3 gap-4 py-2 px-1'>
        {isLoading || isIdle ? (
          <span>Loading projects...</span>
        ) : (
          isSuccess &&
          (!data?.projects?.length ? (
            <span>No match found</span>
          ) : (
            data?.projects.map(project => (
              <ProjectCard key={project.id} {...project} />
            ))
          ))
        )}
      </div>
    </section>
  )
}

export default React.memo(ProjectsGrid)
