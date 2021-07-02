import * as React from 'react'
import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import {ParsedUrlQuery} from 'querystring'

import {useForm} from 'react-hook-form'
import useFetchProjectsWithToken from '@hooks/fetch/useFetchProjectsWithToken'

import {fetchTechnologiesWithToken} from '@api/fetchWithToken'
import {parseCookies} from '@utils/parseCookies'

import Container from '@components/containers/Container/Container'
import ProjectsGrid from '@components/features/Project/Grid'
import Drawer from '@components/navigation/Drawer/Drawer'

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
  async (context: GetServerSidePropsContext<ParsedUrlQuery>) => {
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
    const {technologies: options} = await fetchTechnologiesWithToken(token)

    //* return token and technologies
    return {
      props: {
        token,
        options,
      },
    }
  }
