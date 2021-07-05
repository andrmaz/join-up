import Link from 'next/link'
import useFetchUserProjectsWithToken from '@hooks/fetch/useFetchUserProjectsWithToken'
import ProjectPreview from '@components/features/Project/Preview'
import {EmptyMessage} from '@components/notifications/Message/Empty'

const ProjectsList = ({token}: {token: string}): React.ReactElement => {
  const projects = useFetchUserProjectsWithToken(token)
  return (
    <section className='pt-12'>
      {projects.length ? (
        <ul className='flex flex-col'>
          {projects.map(project => (
            <ProjectPreview key={project.id} project={project} />
          ))}
        </ul>
      ) : (
        <EmptyMessage>
          It seems there is not any project yet. <br />
          Click{' '}
          <Link href='/new/project'>
            <a className='underline'>here</a>
          </Link>{' '}
          to create your first project
        </EmptyMessage>
      )}
    </section>
  )
}

export default ProjectsList
