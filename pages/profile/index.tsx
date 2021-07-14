import * as React from 'react'
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'

import UserCard from '@components/lib/User/Card'
import ProjectsList from '@components/lib/Project/List'

import {getSessionTokenProps} from '@api/getServerSideProps'

import type {TokenParamsType} from 'app/types/params'

const Profile: NextPage<TokenParamsType> = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>Profile</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v'>
        <section className='h-full py-12 xl:py-32 px-40 xl:px-80'>
          <div className='grid grid-cols-3 divide-x divide-black-500 gap-4'>
            <UserCard />
            <article className='w-200 min-h-1/2 border-2 border-solid rounded'>
              <header className='fixed top-20 z-30 w-full h-26 p-4 pt-12 text-2xl bg-white'>
                <h3>Your Projects</h3>
              </header>
              <main className='w-full p-1'>
                <ProjectsList token={token} />
              </main>
            </article>
          </div>
        </section>
      </main>
    </section>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps<TokenParamsType> =
  getSessionTokenProps
