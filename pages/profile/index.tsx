import * as React from 'react'
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'

import Container from '@components/containers/Container/Container'
import Wrapper from '@components/containers/Wrapper/Wrapper'
import UserCard from '@components/features/User/Card'
import ProjectsList from '@components/features/Project/List'

import {getSessionTokenProps} from '@api/getServerSideProps'

import type {SessionTokenParamType} from 'app/types/params'

const Profile: NextPage<SessionTokenParamType> = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container>
      <Head>
        <title>Profile</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v'>
        <Wrapper>
          <div className='grid grid-cols-3 divide-x divide-black-500'>
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
        </Wrapper>
      </main>
    </Container>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps<SessionTokenParamType> =
  getSessionTokenProps
