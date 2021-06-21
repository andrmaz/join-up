import * as React from 'react'
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'
import axios from 'axios'
import {Params} from 'next/dist/next-server/server/router'

import {useAuthState} from '@hooks/auth/useAuthState'
import {parseCookies} from '@utils/parseCookies'
import {usePositionReducer} from '@hooks/position/usePositionReducer'

import Container from '@components/containers/Container/Container'
import Wrapper from '@components/containers/Wrapper/Wrapper'
import ProjectOverview from '@components/features/Project/Overview'
import {EmptyMessage} from '@components/notifications/Message/Empty'
import PositionLayout from '@components/features/Position/Layout'
import {ActionButton} from '@components/form/Button/Action'
import AddPosition from '@components/features/Add/Position'

const Slug: NextPage = ({
  project,
  positions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {user} = useAuthState()
  const [state, dispatch] = usePositionReducer(positions)
  const [showModal, setShowModal] = React.useState<boolean>(false)
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
            <PositionLayout positions={state.positions} dispatch={dispatch} />
          ) : (
            <EmptyMessage>This project has no posts available.</EmptyMessage>
          )}
        </Wrapper>
        <AddPosition
          showModal={showModal}
          setShowModal={setShowModal}
          dispatch={dispatch}
        />
      </main>
    </Container>
  )
}

export default Slug

export const getServerSideProps: GetServerSideProps<Params> = async context => {
  //* Get the user's session based on the request
  const {session: token} = parseCookies(context.req)

  //* project id parameter will be sent as a query parameter (slug) to the page
  const {slug} = context.params as Params

  //* If no user, redirect to login
  if (!token) {
    return {
      props: {},
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  //* If there is a user,
  const {
    data: {project},
  } = await axios.get(`/project/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const {
    data: {positions: positions},
  } = await axios.get(`/position/project/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  //* return project data
  return {
    props: {
      project,
      positions,
    },
  }
}
