import * as React from 'react'

import type {IProjectData} from 'app/types/project'
import ProjectCard from '@screens/Project/Card'

const ProjectsGrid = ({projects}: {projects: IProjectData[]}): JSX.Element => {
  return (
    <section className='w-200 min-h-screen h-auto'>
      <div className='grid grid-cols-2 xl:grid-cols-3 gap-4 py-2 px-1'>
        {projects.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  )
}

export default React.memo(ProjectsGrid)
