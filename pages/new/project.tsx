import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'

import CreateProjectForm from '@components/Form/project/helpers/Create'

import {getSessionTokenProps} from '@api/getServerSideProps'
import type {TokenParamsType} from 'app/types/params'

const Project: NextPage<TokenParamsType> = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>New</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v flex justify-center items-center'>
        <article className='w-3/5 xl:w-1/2 h-4/5 p-4 xl:px-12 rounded border-black border-2 shadow-2xl'>
          <header className='h-1/6'>
            <h1 className='h-2/3 text-3xl'>Create a new project</h1>
            <span>
              Please fill out this form to start creating a new project
            </span>
          </header>
          <CreateProjectForm token={token} />
        </article>
      </main>
    </section>
  )
}

export default Project

export const getServerSideProps: GetServerSideProps<TokenParamsType> =
  getSessionTokenProps
