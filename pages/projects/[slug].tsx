import * as React from 'react'
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'

import {useAuthState} from '@hooks/auth/useAuthState'
import {usePositionContext} from '@hooks/position/usePositionContext'

import ProjectOverview from '@components/Project/Overview'
import {EmptyMessage} from '@components/lib/Message/Empty'
import PositionTablist from '@components/Position/Tablist'
import CreatePosition from '@components/Position/Create'

import {getProjectProps} from '@api/getServerSideProps'

import type {ProjectParamsType} from 'app/types/params'

const Slug: NextPage<ProjectParamsType> = ({
  project,
  positions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {user} = useAuthState()
  const {state, dispatch} = usePositionContext()
  React.useEffect(() => {
    dispatch({type: 'persist', payload: positions})
    return () => dispatch({type: 'clear'})
  }, [dispatch, positions])
  return (
    <section className='h-min-screen mt-16'>
      <Head>
        <title>Project</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v'>
        <section className='h-full py-12 px-40 xl:px-80'>
          <article className='w-full h-2/5'>
            <div className='absolute right-40 xl:right-80'>
              {user?.id === project.owner && <CreatePosition />}
            </div>
            <ProjectOverview {...project} />
          </article>
          {state.positions.length ? (
            <PositionTablist positions={state.positions} />
          ) : (
            <EmptyMessage>This project has no posts available.</EmptyMessage>
          )}
        </section>
      </main>
    </section>
  )
}

export default Slug

export const getServerSideProps: GetServerSideProps<ProjectParamsType> =
  getProjectProps
