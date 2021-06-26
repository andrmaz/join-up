import * as React from 'react'
import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import axios, {Canceler} from 'axios'
import {ParsedUrlQuery} from 'querystring'

import {useProjectContext} from '@hooks/project/useProjectContext'
import {parseCookies} from '@utils/parseCookies'

import Container from '@components/containers/Container/Container'
import Wrapper from '@components/containers/Wrapper/Wrapper'
import UserCard from '@components/features/User/Card'
import ProjectsList from '@components/features/Project/List'

const Profile: NextPage = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {projects, persist, clear} = useProjectContext()
  React.useEffect(() => {
    let cancel: Canceler
    ;(async () => {
      try {
        const {
          data: {projects},
        } = await axios.get('/project/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: new axios.CancelToken(c => (cancel = c)),
        })
        persist(projects)
      } catch (thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message)
          return thrown.message
        } else {
          Promise.reject(thrown)
        }
      }
    })()
    //* Cleanup
    return () => {
      //* cancel the request
      cancel()
      clear()
    }
  }, [clear, persist, token])
  return (
    <Container>
      <Head>
        <title>Profile</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v'>
        <Wrapper>
          <div className='grid grid-cols-3 divide-x divide-black-500'>
            <UserCard />
            <article className='w-200 min-h-1/2 border-2 border-solid rounded'>
              <header className='fixed top-20 z-30 w-full h-26 p-4 pt-12 text-2xl bg-white'>
                <h3>Your Projects</h3>
              </header>
              <main className='w-full p-1'>
                <ProjectsList projects={projects} />
              </main>
            </article>
          </div>
        </Wrapper>
      </main>
    </Container>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  //* Get the user's session based on the request
  const {session: token} = parseCookies(context.req)

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

  //* If there is a user, return session token
  return {
    props: {token},
  }
}
