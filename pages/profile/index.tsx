import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {ParsedUrlQuery} from 'querystring'
import axios from 'axios'

import {parseCookies} from '@utils/parseCookies'
import Navbar from '@components/Navbar'
import CardItems from '@components/Card/CardItems'
import type {IProjectData} from 'app/types/project'

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
      <main className='h-92v py-16 px-32 xl:px-48'>
        <div className='h-full grid grid-cols-3 divide-x divide-black-500'>
          <CardItems />
          <article className='w-200 h-full border-2 border-solid rounded'>
            <header className='w-max h-12 m-auto text-2xl mb-2'>
              <h3>Projects</h3>
            </header>
            <main className='w-full h-auto p-1'>
              <section>
                {projects.length ? (
                  <div className='grid grid-flow-row grid-cols-2 grid-rows-2 gap-2'>
                    {projects
                      //.filter((_: IProjectData, index: number) => index < 4)
                      .map((project: IProjectData) => {
                        const {_id, name} = project
                        return (
                          <div
                            key={_id}
                            className='h-30 p-1 border-gray-300 border-2 rounded'
                          >
                            <h3>{name.toUpperCase()}</h3>
                          </div>
                        )
                      })}
                  </div>
                ) : (
                  <div className='w-full flex justify-center'>
                    <span className='text-lg xl:text-2xl text-center tracking-wide'>
                      It seems you do not have any project yet. <br /> Click{' '}
                      <Link href='/new/project'>
                        <a className='underline'>here</a>
                      </Link>{' '}
                      to create your first project
                    </span>
                  </div>
                )}
              </section>
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
