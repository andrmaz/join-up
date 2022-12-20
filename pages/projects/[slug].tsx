import * as React from 'react'

import {GetServerSideProps, NextPage} from 'next'

import CreatePosition from '@screens/Position/Create'
import Head from 'next/head'
import {PositionList} from '@screens/Position/List'
import ProjectOverview from '@screens/Project/Overview'
import {QueryResult} from '@components/Result/Query'
import checkAuth from '@utils/auth'
import {trpc} from '@utils/trpc'
import {useSession} from 'next-auth/react'

const Slug: NextPage = () => {
  const {data: session} = useSession()
  const {status, error, data} = trpc.project.detail.useQuery()

  return (
    <section className='h-min-screen mt-16'>
      <Head>
        <title>Project</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-full xl:h-92v'>
        <QueryResult status={status} error={error} data={data}>
          {({response: {project}}) => (
            <section className='h-full py-4 xl:py-12 px-40 xl:px-80'>
              <article className='w-full h-2/5 mb-4'>
                <div className='absolute right-40 xl:right-80'>
                  {session?.user.id === project.owner.toString() && (
                    <CreatePosition id={project.id} />
                  )}
                </div>
                <ProjectOverview {...project} />
              </article>
              <PositionList id={project.id} />
            </section>
          )}
        </QueryResult>
      </main>
    </section>
  )
}

export default Slug

export const getServerSideProps: GetServerSideProps = async context => {
  await checkAuth(context)
  return {props: {}}
}
