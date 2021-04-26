import * as React from 'react'
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'
import axios from 'axios'
import {parseCookies} from '@utils/parseCookies'
import {Params} from 'next/dist/next-server/server/router'
import Navbar from '@components/Navbar/Navbar'
import ProjectBadge from '@components/Project/Badge'
import PositionTabs from '@components/Position/Tabs'
import PositionPanels from '@components/Position/Panels'
import {EmptyMessage} from '@components/Message/Empty'

const Slug: NextPage = ({
  project,
  positions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedTab, setSelectedTab] = React.useState<number>(0)
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Project</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className='h-screen pt-20'>
        <section className='h-full py-12 px-24 xl:px-40'>
          <article className='w-full h-1/5'>
            <ProjectBadge {...project} />
          </article>
          {project.jobsAvailable ? (
            <article className='h-4/5 grid grid-cols-2 divide-x divide-black-500'>
              <PositionTabs
                positions={positions}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
              <PositionPanels positions={positions} selectedTab={selectedTab} />
            </article>
          ) : (
            <EmptyMessage>This project has no posts available.</EmptyMessage>
          )}
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
    data: {positions},
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
