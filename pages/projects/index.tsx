import * as React from 'react'
import Head from 'next/head'

import {useForm} from 'react-hook-form'
import useProjects from '@hooks/projects/useProjects'

import Drawer from '@components/lib/Drawer/Drawer'
import ProjectsGrid from '@components/Project/Grid'

import {NextPage} from 'next'

const Projects: NextPage = () => {
  //TODO: Infer Input Type (NestedValue)
  const {control, register, watch, setValue} = useForm()
  //* watching every fields in the form
  const fields = watch()
  //* fetching project according to the fields
  const {isIdle, isLoading, isError, isSuccess, data} = useProjects(fields)
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
            isPending={isLoading}
            setValue={setValue}
            control={control}
            technologies={fields.technologies}
          />
          <ProjectsGrid
            isIdle={isIdle}
            isLoading={isLoading}
            isError={isError}
            isSuccess={isSuccess}
            data={data}
          />
        </article>
      </main>
    </section>
  )
}

export default Projects
