import * as React from 'react'

import Head from 'next/head'
import {NextPage} from 'next'
import ProjectsList from '@screens/Project/List'
import UserCard from '@screens/User/Card'
import {trpc} from '@utils/trpc'
import {useAuthState} from '@hooks/auth/useAuthState'
import {useProjectContext} from '@hooks/project/useProjectContext'

const Profile: NextPage = () => {
  const {user} = useAuthState()
  const {persist, clear} = useProjectContext()
  const result = trpc.project.list.useQuery()
  const projects = result.data?.projects

  React.useEffect(() => {
    persist(projects || [])
    return () => clear()
  }, [clear, persist, projects])

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

/* export const getServerSideProps: GetServerSideProps = async context => {
  try {
    await privateFetch(context).get<ProjectsResponseType>('/project/user')
    return {props: {}}
  } catch (error) {
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
    throw error
  } 
}*/
