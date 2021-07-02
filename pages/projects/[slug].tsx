import * as React from 'react'
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'
import axios from 'axios'
import {Params} from 'next/dist/next-server/server/router'

import {useAuthState} from '@hooks/auth/useAuthState'
import {parseCookies} from '@utils/parseCookies'
import {usePositionContext} from '@hooks/position/usePositionContext'

import Container from '@components/containers/Container/Container'
import Wrapper from '@components/containers/Wrapper/Wrapper'
import ProjectOverview from '@components/features/Project/Overview'
import {EmptyMessage} from '@components/notifications/Message/Empty'
import PositionLayout from '@components/features/Position/Layout'
import {ActionButton} from '@components/form/Button/Action'
import NewPosition from '@components/features/Position/New'

import type {
  ProjectResponseType,
  PositionsResponseType,
} from 'app/types/response'
import type {SlugParamsType} from 'app/types/params'

const Slug: NextPage<SlugParamsType> = ({
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
        <NewPosition showModal={showModal} setShowModal={setShowModal} />
      </main>
    </Container>
  )
}

export default Slug

export const getServerSideProps: GetServerSideProps<SlugParamsType> =
  async context => {
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
    } = await axios.get<ProjectResponseType>(`/project/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const {
      data: {positions},
    } = await axios.get<PositionsResponseType>(`/position/project/${slug}`, {
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
