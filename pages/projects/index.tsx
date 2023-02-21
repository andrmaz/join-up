import * as React from 'react'

import {GetServerSideProps, NextPage} from 'next'

import Drawer from '@components/Drawer/Drawer'
import type {DrawerValues} from 'app/types/components'
import Head from 'next/head'
import ProjectsGrid from '@screens/Project/Grid'
import QueryResult from '@components/Result/Query'
import {trpc} from '@utils/trpc'
import {useForm} from 'react-hook-form'
import checkAuth from '@utils/auth'

const Projects: NextPage = () => {
  const {control, register, watch, setValue} = useForm<DrawerValues>()
  //* watching every fields in the form
  const {date, match, available, technologies} = watch()
  //* fetching project according to the fields
  const {status, error, data, isFetching} = trpc.project.list.useQuery({
    date,
    match,
    technologies,
    available,
  })

  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>Projects</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-auto py-10 px-10'>
        <article className='h-auto grid grid-cols-3 divide-x divide-black-500'>
          <Drawer
            register={register}
            isPending={isFetching}
            setValue={setValue}
            control={control}
            technologies={technologies}
          />
          <QueryResult status={status} error={error} data={data}>
            {({projects}) => <ProjectsGrid projects={projects} />}
          </QueryResult>
        </article>
      </main>
    </section>
  )
}

export default Projects

export const getServerSideProps: GetServerSideProps = async context => {
  await checkAuth(context)
  return {props: {}}
}
