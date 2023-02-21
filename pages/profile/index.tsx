import * as React from 'react'

import {NextPage} from 'next'

import Head from 'next/head'
import ProjectsList from '@screens/Project/List'
import QueryResult from '@components/Result/Query'
import UserCard from '@screens/User/Card'
import {trpc} from '@utils/trpc'

const Profile: NextPage = () => {
  const {status, error, data} = trpc.user.detail.useQuery()

  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>Profile</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v'>
        <QueryResult status={status} error={error} data={data}>
          {({user}) => (
            <section className='h-auto py-12 xl:py-32 px-40 xl:px-80'>
              <div className='grid grid-cols-3 divide-x divide-black-500 gap-4'>
                <UserCard {...user} />
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
          )}
        </QueryResult>
      </main>
    </section>
  )
}

export default Profile

/* export const getServerSideProps: GetServerSideProps = async context => {
  await checkAuth(context)
  return {props: {}}
}
 */
