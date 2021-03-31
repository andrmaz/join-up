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

import {parseCookies} from '@utils/parseCookies'
import Navbar from '@components/Navigation/Navbar'
import ProjectCard from '@components/Project/Card'
import FormSelect from '@components/Form/Select'

import type {IProjectData} from 'app/types/project'
import type {SelectOptions} from 'app/types/form'

const Projects: NextPage = ({
  projects,
  technologies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {user} = useAuthState()
  const {control, setValue} = useForm()
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
                >
                  <option value='newest' defaultChecked>
                    Newest
                  </option>
                  <option value='oldest'>Oldest</option>
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
                    />
                    <label htmlFor='any'>Any</label>
                  </div>
                  <div className='m-1'>
                    <input type='radio' id='all' name='match' value='all' />
                    <label htmlFor='all'>All</label>
                  </div>
                </div>
              </div>
              <div className='my-4'>
                <p className='xl:text-2xl'>
                  Check if you want to only see available positions:
                </p>
                <div>
                  <input type='checkbox' id='available' name='available' />
                  <label htmlFor='available'>Available</label>
                </div>
              </div>
              <FormSelect
                id='technologies'
                label='Technologies'
                options={technologies}
                placeholder='Choose your tech stack'
                message='Please select at least one technology'
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
              {projects
                .filter((project: IProjectData) => project.owner !== user?._id)
                .map((project: IProjectData) => (
                  <ProjectCard key={project._id} {...project} />
                ))}
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
    data: {projects},
  } = await axios.get('/project', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const {
    data: {technologies},
  } = await axios.get('/technology', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  //* return projects
  return {
    props: {
      projects,
      technologies,
    },
  }
}
