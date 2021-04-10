import ProjectBadge from '@components/Project/Badge'
import {EmptyMessage} from '@components/Message/Empty'
import PositionPreview from '@components/Position/Preview'
import type {IProjectData} from 'app/types/project'
import type {IPosistionData} from 'app/types/position'

const ProjectOverview = ({
  project,
  positions,
}: {
  project: IProjectData
  positions: IPosistionData[]
}): JSX.Element => {
  return (
    <div className='w-full min-h-full p-4'>
      <article className='w-full h-auto'>
        <ProjectBadge {...project} />
      </article>
      {project.jobsAvailable ? (
        <article className='grid grid-cols-2 divide-x divide-black-500'>
          <section className='w-full h-auto p-1'>
            <ul className='h-auto'>
              {positions.map(position => (
                <PositionPreview key={position._id} {...position} />
              ))}
            </ul>
          </section>
          <section className='w-full'></section>
        </article>
      ) : (
        <EmptyMessage>This project has no posts available.</EmptyMessage>
      )}
    </div>
  )
}

export default ProjectOverview
