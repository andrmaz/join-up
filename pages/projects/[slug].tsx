import * as React from 'react'
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'

import {useAuthState} from '@hooks/auth/useAuthState'
import {usePositionContext} from '@hooks/position/usePositionContext'

import Container from '@components/containers/Container/Container'
import Wrapper from '@components/containers/Wrapper/Wrapper'
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
    <Container>
      <Head>
        <title>Project</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v'>
        <Wrapper>
          <article className='w-full h-2/6'>
            <div className='absolute right-24 w-1/5'>
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
        </Wrapper>
        <NewPosition
          projectId={project.id}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </main>
    </Container>
  )
}

export default Slug

export const getServerSideProps: GetServerSideProps<ProjectParamsType> =
  getProjectProps
