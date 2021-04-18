import * as React from 'react'
import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'

import {ParsedUrlQuery} from 'querystring'
import axios from 'axios'
import {useForm} from 'react-hook-form'

import {useAuthState} from '@hooks/auth/useAuthState'
import {useAsyncReducer} from '@hooks/async/useAsyncReducer'

import {parseCookies} from '@utils/parseCookies'
import Navbar from '@components/Navbar/Navbar'
import ProjectsGrid from '@components/Project/Grid'
import Drawer from '@components/Drawer/Drawer'

const Projects: NextPage = ({
  token,
  techOptions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [state, dispatch] = useAsyncReducer()
  const {user} = useAuthState()
  const {control, register, watch, setValue} = useForm()
  //* watching every fields in the form
  const {date, match, /* available ,*/ technologies} = watch()
  const fetchProjectsData = React.useCallback(() => {
    //* technologies field is the only one with no default value
    //* it must be checked before each fetching
    const tech =
      technologies && technologies.length
        ? `&technologies=${technologies.toString()},`
        : ''
    dispatch({type: 'pending'})
    //TODO: Test job field
    axios
      .get(`/project?sort=${date}&match=${match}${tech}`, {
        //&job=${available}
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response =>
        dispatch({type: 'resolved', payload: response.data.projects})
      )
      .catch(err =>
        dispatch({type: 'rejected', payload: err.response.data.message})
      )
    //TODO: Add 'available' to dependencies list
  }, [date, match, technologies, token, dispatch])
  React.useEffect(() => {
    fetchProjectsData()
  }, [fetchProjectsData])
  // State
  const {status, data /* ,error */} = state
  // Status
  const isPending = status === 'pending'
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Projects</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className='h-auto mt-20 py-10 px-10'>
        <article className='h-auto grid grid-cols-3 divide-x divide-black-500'>
          <Drawer
            register={register}
            isPending={isPending}
            options={techOptions}
            setValue={setValue}
            control={control}
            technologies={technologies}
          />
          <ProjectsGrid status={status} projects={data} currentUser={user} />
        </article>
      </main>
    </div>
  )
}

export default Projects

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
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

  const {
    data: {technologies: techOptions},
  } = await axios.get('/technology', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  //* return projects
  return {
    props: {
      token,
      techOptions,
    },
  }
}
