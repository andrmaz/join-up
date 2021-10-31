import * as React from 'react'

import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {handleAxiosError, handleUnexpectedError} from '@utils/errors'

import Head from 'next/head'
import type {IProjectData} from 'app/types/project'
import ProjectsList from '@components/Project/List'
import type {ProjectsResponseType} from 'app/types/response'
import UserCard from '@components/User/Card'
import axios from 'axios'
import {privateFetch} from '@utils/fetch'
import {useAuthState} from '@hooks/auth/useAuthState'
import {useProjectContext} from '@hooks/project/useProjectContext'

type Props = {projects: IProjectData[]}

const Profile: NextPage<Props> = ({
  projects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {persist, clear} = useProjectContext()
  React.useEffect(() => {
    persist(projects)
    return () => clear()
  }, [clear, persist, projects])
  const {user} = useAuthState()
  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>Profile</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v'>
        <section className='h-auto py-12 xl:py-32 px-40 xl:px-80'>
          <div className='grid grid-cols-3 divide-x divide-black-500 gap-4'>
            {user ? <UserCard {...user} /> : null}
            <article className='w-200 min-h-1/2 border-2 border-solid rounded'>
              <header className='fixed top-12 xl:top-16 z-30 w-full h-26 p-4 pt-12 text-2xl bg-white'>
                <h3>Your Projects</h3>
              </header>
              <main className='w-full p-1'>
                <ProjectsList />
              </main>
            </article>
          </div>
        </section>
      </main>
    </section>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  try {
    const response = await privateFetch(context).get<ProjectsResponseType>(
      '/project/user'
    )
    const {projects} = response.data
    return {props: {projects}}
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      handleAxiosError(error)
      if (error?.response?.status === 401) {
        console.log('Redirect')
        return {
          redirect: {
            destination: '/signin',
            permanent: false,
          },
        }
      }
    } else {
      handleUnexpectedError(error)
    }
    return Promise.reject(error.toJSON())
  }
}
