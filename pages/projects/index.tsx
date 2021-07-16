import * as React from 'react'
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next'
import Head from 'next/head'

import {useForm} from 'react-hook-form'
import useFetchProjectsWithToken from '@hooks/fetch/useFetchProjectsWithToken'

import Drawer from '@components/lib/Drawer/Drawer'
import ProjectsGrid from '@components/Project/Grid'

import {getSessionTokenProps} from '@api/getServerSideProps'

import type {TokenParamsType} from 'app/types/params'

const Projects: NextPage<TokenParamsType> = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {control, register, watch, setValue} = useForm()
  //* watching every fields in the form
  const fields = watch()
  const {isIdle, isLoading, isError, isSuccess, data} =
    useFetchProjectsWithToken(token, fields)
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

export const getServerSideProps: GetServerSideProps<TokenParamsType> =
  getSessionTokenProps
