import * as React from 'react'
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'

import {useAuthState} from '@hooks/auth/useAuthState'
import {usePositionContext} from '@hooks/position/usePositionContext'

import ProjectOverview from '@components/lib/Project/Overview'
import {EmptyMessage} from '@components/notifications/Message/Empty'
import PositionLayout from '@components/lib/Position/Layout'
import {ActionButton} from '@components/form/Button/Action'
import NewPosition from '@components/lib/Position/New'

import {getProjectProps} from '@api/getServerSideProps'

import type {ProjectParamsType} from 'app/types/params'

const Slug: NextPage<ProjectParamsType> = ({
  project,
  positions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {user} = useAuthState()
  const {state, dispatch} = usePositionContext()
  const [showModal, setShowModal] = React.useState<boolean>(false)
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
              {user?.id === project.owner && (
                <ActionButton tabIndex={0} action={() => setShowModal(true)}>
                  Add a new position
                </ActionButton>
              )}
            </div>
            <ProjectOverview {...project} />
          </article>
          {state.positions.length ? (
            <PositionLayout positions={state.positions} />
          ) : (
            <EmptyMessage>This project has no posts available.</EmptyMessage>
          )}
        </section>
        <NewPosition
          projectId={project.id}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </main>
    </section>
  )
}

export default Slug

export const getServerSideProps: GetServerSideProps<ProjectParamsType> =
  getProjectProps
