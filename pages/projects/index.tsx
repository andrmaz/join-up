import * as React from 'react'
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'

import {useForm} from 'react-hook-form'
import useFetchProjectsWithToken from '@hooks/fetch/useFetchProjectsWithToken'

import Container from '@components/containers/Container/Container'
import Drawer from '@components/navigation/Drawer/Drawer'
import ProjectsGrid from '@components/features/Project/Grid'

import {getTokenAndOptions} from '@api/getServerSideProps'

import type {ProjectsParamsType} from 'app/types/params'

const Projects: NextPage<ProjectsParamsType> = ({
  token,
  options,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {control, register, watch, setValue} = useForm()
  //* watching every fields in the form
  const fields = watch()
  const [state, technologies] = useFetchProjectsWithToken(token, fields)
  // State
  const {status, data /* ,error */} = state
  // Status
  const isPending = status === 'pending'
  return (
    <Container>
      <Head>
        <title>Projects</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-auto py-10 px-10'>
        <article className='h-auto grid grid-cols-3 divide-x divide-black-500'>
          <Drawer
            register={register}
            isPending={isPending}
            options={options}
            setValue={setValue}
            control={control}
            technologies={technologies}
          />
          <ProjectsGrid status={status} projects={data} />
        </article>
      </main>
    </Container>
  )
}

export default Projects

export const getServerSideProps: GetServerSideProps<ProjectsParamsType> =
  getTokenAndOptions
