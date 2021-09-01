import Head from 'next/head'
import axios from 'axios'

import {privateFetch} from '@utils/fetch'
import {handleAxiosError, handleUnexpectedError} from '@utils/errors'

import {GetServerSideProps, NextPage, InferGetServerSidePropsType} from 'next'
import type {IProjectData} from 'app/types/project'
import type {IPositionData} from 'app/types/position'
import type {IApplicationData} from 'app/types/application'

type Props = {
  projects: IProjectData[]
  position: IPositionData[]
  applications: IApplicationData[]
}

const Home: NextPage<{data: Props}> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>Home Page</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v'>
        <section className='h-full py-12 xl:py-32 px-20 xl:px-40'>
          <article className='h-1/3 w-full border-2 my-1 rounded'>
            Banner
          </article>
          <section className='h-2/3 w-full flex flex-col justify-evenly'>
            <article className='h-3/10 w-full my-4'>
              <h2 className='h-1/5'>
                Here you are some suggestions according to your profile
              </h2>
              <ul className='flex h-4/5 overflow-x-auto'>
                {data.projects.map(p => (
                  <li key={p.id} className='h-full min-w-1/4 border-2 p-1 mx-1'>
                    <h3>{p.name}</h3>
                  </li>
                ))}
              </ul>
            </article>
            <article className='h-3/10 w-full my-4'>
              <h2 className='h-1/5'>
                Here you are some suggestions according to your profile
              </h2>
              <ul className='flex h-4/5 overflow-x-auto'>
                {data.position.map(p => (
                  <li key={p.id} className='h-full min-w-1/4 border-2 p-1 mx-1'>
                    <h3>{p.title}</h3>
                  </li>
                ))}
              </ul>
            </article>
            {data.applications.length ? (
              <article className='h-3/10 w-full my-4'>
                <h2 className='h-1/5'>
                  Here you are some suggestions according to your profile
                </h2>

                <ul className='flex h-4/5 overflow-x-auto'>
                  {data.applications.map(a => (
                    <li
                      key={a.id}
                      className='h-full min-w-1/4 border-2 p-1 mx-1'
                    >
                      {JSON.stringify(a, null, 2)}
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}
          </section>
        </section>
      </main>
    </section>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<{data: Props}> =
  async context => {
    try {
      const {data} = await privateFetch(context).get('/feed')
      return {props: {data}}
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error)
        if (error?.response?.status === 401) {
          console.log('Redirect')
          return {
            redirect: {
              destination: '/signin',
              permanent: false,
            },
          }
        }
      } else {
        handleUnexpectedError(error)
      }
      return Promise.reject(error.toJSON())
    }
  }
