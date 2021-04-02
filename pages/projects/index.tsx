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

import {useAuthState} from '@hooks/useAuthState'
import {useAsyncReducer} from '@hooks/useAsyncReducer'

import {parseCookies} from '@utils/parseCookies'
import Navbar from '@components/Navigation/Navbar'
import ProjectCard from '@components/Project/Card'
import FormSelect from '@components/Form/Select'

import type {IProjectData} from 'app/types/project'
import type {SelectOptions} from 'app/types/form'

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
  const isResolved = status === 'resolved'
  const isRejected = status === 'rejected'
  return (
    <div className='min-h-screen'>
      <Head>
        <title>Projects</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className='h-92v py-10 px-10'>
        <article className='h-auto grid grid-cols-3 divide-x divide-black-500'>
          <section className='sticky top-0 w-full h-70v p-2'>
            <form className='flex flex-col h-auto justify-around px-2'>
              <div className='flex flex-col'>
                <label htmlFor='sort-by-date' className='xl:text-2xl'>
                  Choose if you want to sort by date
                </label>
                <select
                  name='date'
                  id='sort-by-date'
                  className='border-2 border-gray-200	w-24'
                  ref={register}
                  disabled={isPending ? true : false}
                >
                  <option value='-date' defaultChecked>
                    Newest
                  </option>
                  <option value='+date'>Oldest</option>
                </select>
              </div>
              <div className='mt-4'>
                <p className='xl:text-2xl'>
                  Please select how you want to match technologies:
                </p>
                <div className='flex flex-row'>
                  <div className='m-1'>
                    <input
                      type='radio'
                      id='any'
                      name='match'
                      value='any'
                      defaultChecked
                      ref={register}
                      disabled={isPending ? true : false}
                    />
                    <label htmlFor='any'>Any</label>
                  </div>
                  <div className='m-1'>
                    <input
                      type='radio'
                      id='all'
                      name='match'
                      value='all'
                      ref={register}
                      disabled={isPending ? true : false}
                    />
                    <label htmlFor='all'>All</label>
                  </div>
                </div>
              </div>
              <div className='my-4'>
                <p className='xl:text-2xl'>
                  Check if you want to only see available positions:
                </p>
                <div>
                  <input
                    type='checkbox'
                    id='available'
                    name='available'
                    ref={register}
                    disabled={isPending ? true : false}
                  />
                  <label htmlFor='available'>Available</label>
                </div>
              </div>
              <FormSelect
                id='technologies'
                label='Technologies'
                options={techOptions}
                placeholder='Choose your tech stack'
                message='Please select at least one technology'
                disabled={isPending ? true : false}
                control={control}
                onChange={values => {
                  setValue(
                    'technologies',
                    values.map((value: SelectOptions) => value.label),
                    {
                      shouldValidate: true,
                      shouldDirty: true,
                    }
                  )
                }}
              />
            </form>
          </section>
          <section className='w-200 h-auto'>
            <div className='grid grid-cols-2 xl:grid-cols-3 gap-4 py-2 px-1'>
              {!data ? (
                <span>No match found</span>
              ) : isResolved ? (
                data
                  /*//TODO: Move filtering projects on server side */
                  .filter(
                    (project: IProjectData) => project.owner !== user?._id
                  )
                  .map((project: IProjectData) => (
                    <ProjectCard key={project._id} {...project} />
                  ))
              ) : isPending ? (
                <span>Loading ...</span>
              ) : (
                isRejected && <span>Something went wrong</span>
              )}
            </div>
          </section>
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
