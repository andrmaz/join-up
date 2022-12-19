import * as React from 'react'

import {EmptyMessage} from '@lib/Message/Empty'
import Link from 'next/link'
import ProjectPreview from '@screens/Project/Preview'
import {QueryResult} from '@components/Result/Query'
import {trpc} from '@utils/trpc'

const ProjectsList = (): React.ReactElement => {
  const {status, error, data} = trpc.project.list.useQuery()

  return (
    <section className='pt-12 xl:pt-0'>
      <QueryResult status={status} error={error} data={data}>
        {({projects}) => (
          <React.Fragment>
            {projects.length ? (
              <ul className='flex flex-col py-3'>
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
          </React.Fragment>
        )}
      </QueryResult>
    </section>
  )
}

export default ProjectsList
