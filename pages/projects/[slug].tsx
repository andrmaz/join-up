import * as React from 'react'

import {GetServerSideProps, NextPage} from 'next'

import CreatePosition from '@screens/Position/Create'
import {EmptyMessage} from '@lib/Message/Empty'
import Head from 'next/head'
import {PActions} from 'app/types/constants'
import PositionTablist from '@screens/Position/Tablist'
import ProjectOverview from '@screens/Project/Overview'
import checkAuth from '@utils/auth'
import {trpc} from '@utils/trpc'
import {usePositionContext} from '@hooks/position/usePositionContext'

const Slug: NextPage = () => {
  const {state, dispatch} = usePositionContext()
  const user = trpc.user.detail.useQuery().data?.user

  const {data, isLoading, isError, error} = trpc.project.detail.useQuery()
  const project = data?.response.project

  const positions = trpc.position.list.useQuery({id: project?.id || 0}).data
    ?.response.positions

  React.useEffect(() => {
    //dispatch({type: PActions.persist, payload: positions})
    return () => dispatch({type: PActions.clear})
  }, [dispatch, positions])

  if (isLoading) return <>Loading ...</>
  if (isError) return <>Error: {error.message}</>
  if (!project) return <>Error: Something went wrong</>
  return (
    <section className='h-min-screen mt-16'>
      <Head>
        <title>Project</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-full xl:h-92v'>
        <section className='h-full py-4 xl:py-12 px-40 xl:px-80'>
          <article className='w-full h-2/5 mb-4'>
            <div className='absolute right-40 xl:right-80'>
              {user?.id === project.owner.toString() && (
                <CreatePosition id={project.id} />
              )}
            </div>
            <ProjectOverview {...project} />
          </article>
          {state.positions.length ? (
            <PositionTablist positions={state.positions} />
          ) : (
            <EmptyMessage>This project has no positions yet.</EmptyMessage>
          )}
        </section>
      </main>
    </section>
  )
}

export default Slug

export const getServerSideProps: GetServerSideProps = async context => {
  await checkAuth(context)
  return {props: {}}
}
