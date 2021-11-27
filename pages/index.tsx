import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {handleAxiosError, handleUnexpectedError} from '@utils/errors'

import ApplicationFeed from '@components/Feed/Application'
import Carousel from '@lib/Carousel/Carousel'
import Head from 'next/head'
import type {IApplicationData} from 'app/types/application'
import type {IPositionData} from 'app/types/position'
import type {IProjectData} from 'app/types/project'
//import Image from 'next/image'
import PositionFeed from '@components/Feed/Position'
import ProjectFeed from '@components/Feed/Project'
import axios from 'axios'
import {privateFetch} from '@utils/fetch'

type Props = {
  projects: IProjectData[]
  position: IPositionData[]
  applications: IApplicationData[]
}

const Home: NextPage<{data: Props}> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {projects, position, applications} = data
  return (
    <section className='h-min-screen pt-16'>
      <Head>
        <title>Home Page</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='h-92v'>
        <section className='h-full py-12 px-20 xl:px-40'>
          <article className='h-1/3 w-full border-2 my-2 rounded'>
            {/* <Image
              src=''
              alt='banner'
              width={900}
              height={300}
            /> */}
          </article>
          <section className='h-auto w-full flex flex-col justify-evenly'>
            <Carousel>
              {projects.map(project => (
                <ProjectFeed key={project.id} {...project} />
              ))}
            </Carousel>
            <Carousel>
              {position.map(position => (
                <PositionFeed key={position.id} {...position} />
              ))}
            </Carousel>
            {applications.length ? (
              <Carousel>
                {applications.map(application => (
                  <ApplicationFeed key={application.id} {...application} />
                ))}
              </Carousel>
            ) : null}
          </section>
        </section>
      </main>
    </section>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<{
  data: Props
}> = async context => {
  try {
    const {data} = await privateFetch(context).get('/feed')
    return {props: {data}}
  } catch (error: any) {
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
