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
import Navbar from '@components/Navbar/Navbar'
import UserCard from '@components/User/Card'
import ProjectsList from '@components/Project/List'

const Profile: NextPage = ({
  projects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className='h-screen'>
      <Head>
        <title>Profile</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className='h-screen pt-20'>
        <section className='h-full py-12 px-24 xl:px-32'>
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
        </section>
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
