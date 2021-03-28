import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'

import {ParsedUrlQuery} from 'querystring'
import axios from 'axios'

import {parseCookies} from '@utils/parseCookies'
import Navbar from '@components/Navigation/Navbar'
import Card from '@components/Profile/Card'
import ProjectsList from '@components/Project/List'

const Profile: NextPage = ({
  projects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Profile</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className='h-auto py-16 px-32 xl:px-48'>
        <div className='h-full grid grid-cols-3 divide-x divide-black-500'>
          <Card />
          <article className='w-200 h-full border-2 border-solid rounded'>
            <header className='w-max h-12 text-2xl mb-2 px-4'>
              <h3>Projects</h3>
            </header>
            <main className='w-full h-auto p-1'>
              <ProjectsList projects={projects} />
            </main>
          </article>
        </div>
      </main>
    </div>
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

  //* If there is a user,
  const {
    data: {projects},
  } = await axios.get('/project/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  //* return user projects
  return {
    props: {
      projects,
    },
  }
}
