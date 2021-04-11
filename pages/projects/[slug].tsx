import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'
import axios from 'axios'
import {parseCookies} from '@utils/parseCookies'
import {Params} from 'next/dist/next-server/server/router'
import Navbar from '@components/Navbar/Navbar'
import ProjectBadge from '@components/Project/Badge'
import PositionList from '@components/Position/List'
import {EmptyMessage} from '@components/Message/Empty'

const Slug: NextPage = ({
  project,
  jobs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Project</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className='min-h-screen pt-20 container'>
        <section className='h-auto p-12'>
          <div className='w-full min-h-full p-4'>
            <article className='w-full h-auto'>
              <ProjectBadge {...project} />
            </article>
            {project.jobsAvailable ? (
              <article className='grid grid-cols-2 divide-x divide-black-500'>
                <PositionList items={jobs} />
                <section className='w-full'></section>
              </article>
            ) : (
              <EmptyMessage>This project has no posts available.</EmptyMessage>
            )}
          </div>
        </section>
      </main>
    </div>
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
    data: {jobs},
  } = await axios.get(`/job/project/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  //* return project data
  return {
    props: {
      project,
      jobs,
    },
  }
}
