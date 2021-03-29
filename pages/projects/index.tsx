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
import ProjectCard from '@components/Project/Card'

import type {IProjectData} from 'app/types/project'

const Projects: NextPage = ({
  projects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Projects</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className='h-92v py-10 px-28'>
        <section className='w-full h-auto'>
          <div className='grid grid-cols-3 grid-rows-3 gap-4 py-2 px-1'>
            {projects.map((project: IProjectData) => (
              <ProjectCard key={project._id} {...project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Projects

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
  } = await axios.get('/project', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  //* return projects
  return {
    props: {
      projects,
    },
  }
}
